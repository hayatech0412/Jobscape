<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\View;
use Illuminate\Support\HtmlString;
use Illuminate\Support\Facades\Storage;

class MailTemplate extends Mailable
{
    use Queueable, SerializesModels;

    private $data;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($data, $file = null)
    {
        $this->data = $data;
        $this->file = $file;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $layoutPath = 'emails.mail_template';
        if (View::exists($layoutPath)) {
            $view = View::make($layoutPath, $this->data)->renderSections();
            $subject = trim($view['subject']);
            $text = (!isset($view['text']) || trim($view['text']) == false) ? null : new HtmlString($view['text']);
            $html = (!isset($view['html']) || trim($view['html']) == false) ? null : new HtmlString($view['html']);
            $raw = (!isset($view['raw']) || trim($view['raw']) == false) ? null : $view['raw'];

            if (isset($this->file)) {
                $files = [
                    public_path("/storage{$this->file}")
                ];

                foreach ($files as $file) {
                    $this->attach($file);
                }
            }

            return $this->subject($subject)->view(compact('text', 'raw', 'html'));
        }
    }
}
