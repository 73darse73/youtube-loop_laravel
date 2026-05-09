<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\LoopSetting;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $now = now();

        // ユーザー獲得
        $totalUsers = User::count();
        $todayUsers = User::whereDate('created_at', $now->toDateString())->count();
        $weekUsers = User::where('created_at', '>=', $now->copy()->startOfWeek())->count();
        $monthUsers = User::where('created_at', '>=', $now->copy()->startOfMonth())->count();

        // 日別新規登録（過去30日）
        $dailySignups = User::select(
            DB::raw('DATE(created_at) as date'),
            DB::raw('COUNT(*) as count')
        )
            ->where('created_at', '>=', now()->subDays(29)->startOfDay())
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->keyBy('date');

        $signupChart = collect(range(29, 0))->map(function ($daysAgo) use ($dailySignups) {
            $date = now()->subDays($daysAgo)->toDateString();
            return [
                'date' => $date,
                'count' => $dailySignups->get($date)?->count ?? 0,
            ];
        });

        // 認証方法
        $googleUsers = User::whereNotNull('google_id')->count();
        $emailUsers = $totalUsers - $googleUsers;

        // エンゲージメント
        $totalLoops = LoopSetting::withTrashed()->count();
        $activeLoops = LoopSetting::count();
        $trashedLoops = LoopSetting::onlyTrashed()->count();
        $trashRate = $totalLoops > 0 ? round($trashedLoops / $totalLoops * 100, 1) : 0;
        $avgLoopsPerUser = $totalUsers > 0 ? round($activeLoops / $totalUsers, 1) : 0;
        $activeUsers = LoopSetting::distinct('user_id')->count('user_id');
        $activationRate = $totalUsers > 0 ? round($activeUsers / $totalUsers * 100, 1) : 0;

        // 機能利用状況
        $sharedLoops = LoopSetting::withTrashed()->whereNotNull('share_token')->count();
        $shareRate = $totalLoops > 0 ? round($sharedLoops / $totalLoops * 100, 1) : 0;
        $favoriteLoops = LoopSetting::where('is_favorite', true)->count();
        $favoriteRate = $activeLoops > 0 ? round($favoriteLoops / $activeLoops * 100, 1) : 0;

        // 収益
        $proUsers = User::where('is_pro', true)->count();
        $conversionRate = $totalUsers > 0 ? round($proUsers / $totalUsers * 100, 1) : 0;
        $activeSubscriptions = DB::table('subscriptions')
            ->where('stripe_status', 'active')
            ->count();

        // 人気動画ランキング（上位10件）
        $popularVideos = LoopSetting::select('video_id', 'title', DB::raw('COUNT(*) as loop_count'))
            ->groupBy('video_id', 'title')
            ->orderByDesc('loop_count')
            ->limit(10)
            ->get();

        // お気に入りランキング（上位10件）
        $favoriteVideos = LoopSetting::select('video_id', 'title', DB::raw('COUNT(*) as favorite_count'))
            ->where('is_favorite', true)
            ->groupBy('video_id', 'title')
            ->orderByDesc('favorite_count')
            ->limit(10)
            ->get();

        // ユーザー一覧
        $users = User::select('id', 'name', 'email', 'google_id', 'is_pro', 'created_at')
            ->withCount(['loopSettings', 'loopSettings as active_loop_count'])
            ->orderByDesc('created_at')
            ->get()
            ->map(fn($u) => [
                'id' => $u->id,
                'name' => $u->name,
                'email' => $u->email,
                'authMethod' => $u->google_id ? 'Google' : 'Email',
                'isPro' => $u->is_pro,
                'loopCount' => $u->loop_settings_count,
                'createdAt' => $u->created_at->format('Y-m-d'),
            ]);

        return Inertia::render('Admin/Dashboard', [
            'metrics' => [
                'acquisition' => [
                    'totalUsers' => $totalUsers,
                    'todayUsers' => $todayUsers,
                    'weekUsers' => $weekUsers,
                    'monthUsers' => $monthUsers,
                    'googleUsers' => $googleUsers,
                    'emailUsers' => $emailUsers,
                    'signupChart' => $signupChart,
                ],
                'engagement' => [
                    'totalLoops' => $totalLoops,
                    'activeLoops' => $activeLoops,
                    'trashedLoops' => $trashedLoops,
                    'trashRate' => $trashRate,
                    'avgLoopsPerUser' => $avgLoopsPerUser,
                    'activeUsers' => $activeUsers,
                    'activationRate' => $activationRate,
                ],
                'features' => [
                    'sharedLoops' => $sharedLoops,
                    'shareRate' => $shareRate,
                    'favoriteLoops' => $favoriteLoops,
                    'favoriteRate' => $favoriteRate,
                ],
                'revenue' => [
                    'proUsers' => $proUsers,
                    'conversionRate' => $conversionRate,
                    'activeSubscriptions' => $activeSubscriptions,
                ],
                'popularVideos' => $popularVideos,
                'favoriteVideos' => $favoriteVideos,
                'users' => $users,
            ],
        ]);
    }
}
