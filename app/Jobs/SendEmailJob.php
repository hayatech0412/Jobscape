<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Notification;
use App\Notifications\BaseNotification;
use Illuminate\Support\Facades\Log;

class SendEmailJob implements ShouldQueue
{
    use Queueable;

    /**
     * @var String
     */
    private $email;

    /**
     * @var BaseNotification
     */
    private $notification;

    /**
     * Create a new job instance.
     */
    public function __construct(
        $email,
        BaseNotification $notification
    )
    {
        $this->email = $email;
        $this->notification = $notification;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            Notification::route('mail', $this->email)->notify($this->notification);
        } catch (\Throwable $e) {
            Log::error($e->getMessage());
        }
    }
}
