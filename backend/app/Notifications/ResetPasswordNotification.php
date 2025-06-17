<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Auth\Notifications\ResetPassword;


class ResetPasswordNotification extends ResetPassword
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(string $token)
    {
        $this->token = $token;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via($notifiable): array
    {
    return ['mail'];
    }


    /**
     * Get the mail representation of the notification.
     */
     public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Reset Your AlgoRhythm Password')
            ->line('You requested a password reset.')
            ->action('Reset Password', url(config('app.url') . '/reset-password?token=' . $this->token))
            ->line('If you didn’t request this, ignore this email.');
    }

 
}
