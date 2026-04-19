<?php

namespace App\UseCases;

use App\Models\User;

class PlanPageUseCase
{
    public function index(User $user): array
    {
        return [
            'isPro' => $user->is_pro,
            'loopCount' => $user->loopSettings()->count(),
        ];
    }
}
