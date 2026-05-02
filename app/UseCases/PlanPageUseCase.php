<?php

namespace App\UseCases;

use App\Models\User;

class PlanPageUseCase
{
    public function index(User $user): array
    {
        $subscription = $user->subscription('default');
        $isCancelled = $subscription?->onGracePeriod() ?? false;
        $endsAt = $subscription?->ends_at?->toDateString();

        return [
            'isPro' => $user->is_pro,
            'loopCount' => $user->loopSettings()->count(),
            'isCancelled' => $isCancelled,
            'endsAt' => $endsAt,
        ];
    }
}
