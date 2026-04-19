<?php

namespace App\UseCases;

use App\Models\User;

class HomePageUseCase
{
    public function index(User $user): array
    {
        $loopSettings = $user->loopSettings()->get();

        return [
            'loopSettings' => $loopSettings,
            'isPro' => $user->is_pro,
        ];
    }
}
