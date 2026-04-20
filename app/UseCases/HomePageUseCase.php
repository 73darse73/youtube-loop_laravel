<?php

namespace App\UseCases;

use App\Models\LoopSetting;
use App\Models\User;

class HomePageUseCase
{
    public function index(User $user): array
    {
        $loopSettings = $user->loopSettings()->orderBy('is_favorite', 'desc')->get();

        return [
            'loopSettings' => $loopSettings,
            'isPro' => $user->is_pro,
        ];
    }

    private const FREE_PLAN_LIMIT = 3;

    public function store(User $user, array $params): LoopSetting
    {
        if (!$user->is_pro && $user->loopSettings()->count() >= self::FREE_PLAN_LIMIT) {
            abort(403, 'ループ設定の上限（3件）に達しています。Proプランにアップグレードしてください。');
        }

        return LoopSetting::create($params);
    }

    public function destroy(LoopSetting $loopSetting): void
    {
        $loopSetting->delete();
    }

    public function favorite(LoopSetting $loopSetting): void
    {
        $loopSetting->update(['is_favorite' => !$loopSetting->is_favorite]);
    }
}
