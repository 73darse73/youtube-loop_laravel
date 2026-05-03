<?php

namespace App\Http\Controllers;

use App\Mail\ProUpgradedMail;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Laravel\Cashier\Http\Controllers\WebhookController as CashierWebhookController;

class WebhookController extends CashierWebhookController
{
    public function handleCustomerSubscriptionCreated(array $payload): void
    {
        parent::handleCustomerSubscriptionCreated($payload);

        $customerId = $payload['data']['object']['customer'];
        $user = User::where('stripe_id', $customerId)->first();
        if ($user) {
            $user->update(['is_pro' => true]);
            Mail::to($user->email)->send(new ProUpgradedMail($user));
        }
    }

    public function handleCustomerSubscriptionDeleted(array $payload): void
    {
        parent::handleCustomerSubscriptionDeleted($payload);

        $customerId = $payload['data']['object']['customer'];
        $user = User::where('stripe_id', $customerId)->first();
        if ($user) {
            $user->update(['is_pro' => false]);
        }
    }
}
