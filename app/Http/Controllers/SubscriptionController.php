<?php

namespace App\Http\Controllers;

use App\Mail\SubscriptionCancelledMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class SubscriptionController extends Controller
{
    public function checkout(Request $request)
    {
        $user = $request->user();
        $plan = $request->input('plan', 'monthly');

        if ($plan === 'lifetime') {
            $priceId = config('cashier.price_id_lifetime');
            $checkout = $user->checkout([$priceId => 1], [
                'success_url' => route('subscription.success') . '?session_id={CHECKOUT_SESSION_ID}&plan=lifetime',
                'cancel_url' => route('plan.index'),
                'metadata' => ['plan' => 'lifetime', 'user_id' => $user->id],
            ]);
        } else {
            $priceId = $plan === 'annual'
                ? config('cashier.price_id_annual')
                : config('cashier.price_id_monthly');

            $checkout = $user->newSubscription('default', $priceId)
                ->checkout([
                    'success_url' => route('subscription.success') . '?session_id={CHECKOUT_SESSION_ID}',
                    'cancel_url' => route('plan.index'),
                ]);
        }

        return Inertia::location($checkout->url);
    }

    public function cancel(Request $request)
    {
        $user = $request->user();
        $subscription = $user->subscription('default');

        if (!$subscription) {
            return redirect()->route('plan.index');
        }

        $subscription->cancel();

        $endsAt = $subscription->ends_at?->format('Y年m月d日') ?? '';
        Mail::to($user->email)->send(new SubscriptionCancelledMail($user, $endsAt));

        return redirect()->route('plan.index');
    }

    public function resume(Request $request)
    {
        $subscription = $request->user()->subscription('default');

        if (!$subscription) {
            return redirect()->route('plan.index');
        }

        $subscription->resume();

        return redirect()->route('plan.index');
    }

    public function success(Request $request)
    {
        $plan = $request->query('plan');

        if ($plan === 'lifetime') {
            $request->user()->update(['is_pro' => true, 'is_lifetime_pro' => true]);
            return redirect()->route('plan.index')->with('success', 'Lifetimeプランへの移行が完了しました！');
        }

        $request->user()->update(['is_pro' => true]);
        return redirect()->route('plan.index')->with('success', 'Proプランへのアップグレードが完了しました！');
    }
}
