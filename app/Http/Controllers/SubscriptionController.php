<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Cashier\Exceptions\IncompletePayment;

class SubscriptionController extends Controller
{
    public function checkout(Request $request)
    {
        $user = $request->user();

        return $user->newSubscription('default', config('cashier.price_id'))
            ->checkout([
                'success_url' => route('subscription.success') . '?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => route('plan.index'),
            ]);
    }

    public function success(Request $request)
    {
        return redirect()->route('plan.index')->with('success', 'Proプランへのアップグレードが完了しました！');
    }
}
