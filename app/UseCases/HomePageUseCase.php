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

    public function store(array $params): LoopSetting
    {
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
