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

        $nextBillingDate = null;
        if ($subscription && !$isCancelled) {
            $stripeSubscription = $subscription->asStripeSubscription();
            $periodEnd = $stripeSubscription->items->data[0]->current_period_end
                ?? $stripeSubscription->current_period_end
                ?? null;
            $nextBillingDate = $periodEnd
                ? \Carbon\Carbon::createFromTimestamp($periodEnd, 'Asia/Tokyo')->toDateString()
                : null;
        }

        $planType = $this->resolvePlanType($user, $subscription);

        return [
            'isPro' => $user->is_pro,
            'isLifetime' => (bool) $user->is_lifetime_pro,
            'planType' => $planType,
            'loopCount' => $user->loopSettings()->count(),
            'isCancelled' => $isCancelled,
            'endsAt' => $endsAt,
            'nextBillingDate' => $nextBillingDate,
        ];
    }

    private function resolvePlanType(User $user, $subscription): string
    {
        if ($user->is_lifetime_pro) {
            return 'lifetime';
        }

        if (!$user->is_pro || !$subscription) {
            return 'free';
        }

        $annualPriceId = config('cashier.price_id_annual');
        $stripeSub = $subscription->asStripeSubscription();
        $activePriceId = $stripeSub->items->data[0]->price->id ?? null;

        if ($annualPriceId && $activePriceId === $annualPriceId) {
            return 'annual';
        }

        return 'monthly';
    }
}
