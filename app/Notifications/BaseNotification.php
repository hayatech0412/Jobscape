<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class BaseNotification extends Notification
{
    private $arrayData = [];
    private $textData = [];
    
    public $data;
    public $slug;

    use Queueable;

    /**
     * Get the notification's delivery channels.
     *
     * @param mixed $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    public function handleContent($data, $content, $subject)
    {
        foreach ($data as $key => $value) {
            if (is_array($value)) {
                $this->arrayData[$key] = $value;
            } else {
                $this->textData[$key] = $value;
            }
        }

        $content = $this->replaceArray($content);
        $this->replaceText($content, $subject);

        return [
            'content' => $content,
            'subject' => $subject,
        ];
    }

    protected function replaceArray($content)
    {
        if (!count($this->arrayData)) {
            return $content;
        }

        foreach ($this->arrayData as $arrKey => $rawArrayData) {
            $regexWrapTag = '/({\[' . $arrKey . '\]})(.*)({\[\/' . $arrKey . '\]})/';
            preg_match_all($regexWrapTag, $content, $matches, PREG_SET_ORDER, 0);
            if (!count($matches)) {
                continue;
            }

            $originalString = $matches[0][2];
            $newString = '';
            foreach ($rawArrayData as $arrValue) {
                $processString = $originalString;
                foreach ($arrValue as $key => $value) {
                    $processString = str_replace('{' . $key . '}', $value, $processString);
                }

                $newString .= $processString . "\n";
            }

            $content = preg_replace($regexWrapTag, $newString, $content);
        }

        return $content;
    }

    protected function replaceText(&$content, &$subject)
    {
        if (!count($this->textData)) {
            return $content;
        }

        foreach ($this->textData as $key => $value) {
            $subject = str_replace('{' . $key . '}', $value, $subject);
            $content = str_replace('{' . $key . '}', $value, $content);
        }
    }
}
