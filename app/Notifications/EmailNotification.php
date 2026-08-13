<?php

namespace App\Notifications;

use App\Mail\MailTemplate;
use App\Models\MailTemplate as MailModel;
use App\Notifications\BaseNotification;

class EmailNotification extends BaseNotification
{
    protected $email = "";

    public function __construct($email, $slug, $data)
    {
        $this->data = $data;
        $this->slug = $slug;
        $this->email = $email;
    }

    public function toMail($notifiable)
    {
        $template = MailModel::where('slug', $this->slug)->first();

        $data = $this->handleContent(array_merge($this->data, [
            'app_name' => config('app.name'),
        ]), $template->content, $template->subject);

        return (new MailTemplate($data))->to($this->email);
    }
}
