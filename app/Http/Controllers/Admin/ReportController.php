<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\LoopSetting;
use App\Models\User;
use App\Services\Ga4Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function daily(Request $request)
    {
        if ($request->query('token') !== config('services.report.token')) {
            abort(401, 'Unauthorized');
        }

        $ga4 = new Ga4Service();
        $ga4Overview = rescue(fn() => $ga4->getOverview(), []);
        $now = now();

        $totalUsers   = User::count();
        $todayUsers   = User::whereDate('created_at', $now->toDateString())->count();
        $weekUsers    = User::where('created_at', '>=', $now->copy()->startOfWeek())->count();
        $monthUsers   = User::where('created_at', '>=', $now->copy()->startOfMonth())->count();

        $totalLoops  = LoopSetting::withTrashed()->count();
        $activeLoops = LoopSetting::count();
        $activeUsers = LoopSetting::distinct('user_id')->count('user_id');

        $proUsers        = User::where('is_pro', true)->count();
        $conversionRate  = $totalUsers > 0 ? round($proUsers / $totalUsers * 100, 1) : 0;
        $activationRate  = $totalUsers > 0 ? round($activeUsers / $totalUsers * 100, 1) : 0;

        $yesterdayUsers = User::whereDate('created_at', $now->copy()->subDay()->toDateString())->count();

        return response()->json([
            'date'       => $now->toDateString(),
            'users'      => [
                'total'          => $totalUsers,
                'today'          => $todayUsers,
                'yesterday'      => $yesterdayUsers,
                'this_week'      => $weekUsers,
                'this_month'     => $monthUsers,
                'pro'            => $proUsers,
                'conversion_rate' => $conversionRate,
                'activation_rate' => $activationRate,
            ],
            'loops'      => [
                'total'   => $totalLoops,
                'active'  => $activeLoops,
                'active_users' => $activeUsers,
            ],
            'ga4'        => $ga4Overview,
        ]);
    }
}
