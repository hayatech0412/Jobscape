<?php

namespace App\Services\SMS;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;

class CPaaSNowService
{
    protected $client;
    protected $apiToken;
    protected $baseUrl;

    public function __construct()
    {
        $this->apiToken = config('services.cpaasnow.token');
        $this->baseUrl = config('services.cpaasnow.url', 'https://sandbox.cpaasnow.com');
        
        $this->client = new Client([
            'base_uri' => $this->baseUrl,
            'headers' => [
                'Authorization' => 'Bearer ' . $this->apiToken,
                'Content-Type' => 'application/json',
            ],
        ]);
    }

    public function sendVerificationCode(string $phoneNumber, string $code)
    {
        try {
            $response = $this->client->post('/api/v1/short_messages', [
                'json' => [
                    'to' => $phoneNumber,
                    'text' => "認証コード: {$code}\n\nこのコードは10分間有効です。",
                    'click_tracking' => false,
                    'user_reference' => 'verification-' . time(),
                    'bill_split_code' => 'verification'
                ]
            ]);

            $result = json_decode($response->getBody()->getContents(), true);
            
            Log::info('SMS sent successfully', [
                'phone' => $this->maskPhoneNumber($phoneNumber),
                'reference' => 'verification-' . time()
            ]);

            return true;
        } catch (\Exception $e) {
            Log::error('Failed to send SMS', [
                'phone' => $this->maskPhoneNumber($phoneNumber),
                'error' => $e->getMessage()
            ]);

            throw new \Exception('SMS送信に失敗しました。');
        }
    }

    protected function formatPhoneNumber(string $phoneNumber)
    {
        // Remove any non-numeric characters
        $number = preg_replace('/[^0-9]/', '', $phoneNumber);
        
        // If the number starts with '81', replace it with '0'
        if (substr($number, 0, 2) === '81') {
            $number = '0' . substr($number, 2);
        }
        
        return $number;
    }

    protected function maskPhoneNumber(string $phoneNumber)
    {
        $number = preg_replace('/[^0-9]/', '', $phoneNumber);
        return substr($number, 0, 3) . '****' . substr($number, -4);
    }
} 