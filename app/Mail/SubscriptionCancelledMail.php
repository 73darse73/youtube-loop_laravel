<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Headers;
use Illuminate\Queue\SerializesModels;

class SubscriptionCancelledMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public User $user, public string $endsAt) {}

    public function headers(): Headers
    {
        return new Headers(
            text: [
                'List-Unsubscribe' => '<mailto:support@loop-video.com?subject=unsubscribe>',
                'List-Unsubscribe-Post' => 'List-Unsubscribe=One-Click',
            ],
        );
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: '【Loop Video】Proプランの解約を受け付けました',
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.subscription-cancelled',
        );
    }
}
