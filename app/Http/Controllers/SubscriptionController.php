<?php

namespace App\Http\Controllers;

use App\Mail\SubscriptionCancelledMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Laravel\Cashier\Exceptions\IncompletePayment;

class SubscriptionController extends Controller
{
    public function checkout(Request $request)
    {
        $user = $request->user();

        $checkout = $user->newSubscription('default', config('cashier.price_id'))
            ->checkout([
                'success_url' => route('subscription.success') . '?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => route('plan.index'),
            ]);

        return Inertia::location($checkout->url);
    }

    public function cancel(Request $request)
    {
        $user = $request->user();
        $user->subscription('default')->cancel();

        $endsAt = $user->subscription('default')->ends_at?->format('Y年m月d日') ?? '';
        Mail::to($user->email)->send(new SubscriptionCancelledMail($user, $endsAt));

        return redirect()->route('plan.index');
    }

    public function success(Request $request)
    {
        return redirect()->route('plan.index')->with('success', 'Proプランへのアップグレードが完了しました！');
    }
}
