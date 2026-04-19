<?php

namespace App\UseCases;

use App\Models\LoopSetting;
use App\Models\User;

class TrashPageUseCase
{
    public function index(User $user): array
    {
        $loopSettings = $user->loopSettings()->onlyTrashed()->get();

        return [
            'loopSettings' => $loopSettings,
            'isPro' => $user->is_pro,
        ];
    }

    public function restore(LoopSetting $loopSetting): void
    {
        $loopSetting->restore();
    }

    public function destroy(LoopSetting $loopSetting): void
    {
        $loopSetting->forceDelete();
    }
}
