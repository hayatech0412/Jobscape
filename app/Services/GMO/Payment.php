<?php

namespace App\Services\GMO;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;
use App\Services\GMO\PaymentResponse;

class Payment
{
    protected $config;
    protected $client;
    protected $apiEndpoint;

    public function __construct(array $config)
    {
        $this->config = $config;
        $this->apiEndpoint = $config['Environment'] === 'production'
            ? 'https://p01.mul-pay.jp'
            : 'https://pt01.mul-pay.jp';
        
        $this->client = new Client([
            'base_uri' => $this->apiEndpoint,
            'timeout' => 30,
        ]);
    }

    public function createMember(array $params)
    {
        $response = $this->post('/payment/SaveMember.idPass', [
            'SiteID' => $this->config['SiteID'],
            'SitePass' => $this->config['SitePass'],
            'MemberID' => $params['MemberID'],
            'MemberName' => $params['MemberName'] ?? null,
            'DeleteFlag' => '0'
        ]);

        return new PaymentResponse($response);
    }

    public function createCustomer(array $params)
    {
        // First create or update member
        $memberResponse = $this->createMember([
            'MemberID' => $params['MemberID'],
            'MemberName' => $params['MemberName'] ?? null
        ]);

        if ($memberResponse->isError()) {
            throw new \Exception("Failed to register member: " . $memberResponse->getMessage());
        }

        // Then save card
        $response = $this->post('/payment/SaveCard.idPass', [
            'SiteID' => $this->config['SiteID'],
            'SitePass' => $this->config['SitePass'],
            'MemberID' => $params['MemberID'],
            'Token' => $params['Token'],
            'SeqMode' => '0',
            'DefaultFlag' => '1'
        ]);

        // If card is saved successfully, search for card details
        if (!isset($response['ErrCode'])) {
            $cardDetails = $this->post('/payment/SearchCard.idPass', [
                'SiteID' => $this->config['SiteID'],
                'SitePass' => $this->config['SitePass'],
                'MemberID' => $params['MemberID'],
                'SeqMode' => '0'
            ]);
            
            if (!isset($cardDetails['ErrCode'])) {
                $response = array_merge($response, $cardDetails);
            }
        }

        return new PaymentResponse($response);
    }

    public function searchCard(array $params)
    {
        $response = $this->post('/payment/SearchCard.idPass', [
            'SiteID'    => $this->config['SiteID'],
            'SitePass'  => $this->config['SitePass'],
            'MemberID'  => $params['MemberID'],
            'SeqMode'   => $params['SeqMode'] ?? '0'  // デフォルトは0（0始まり）
        ]);

        return new PaymentResponse($response);
    }

    public function deleteCard(array $params)
    {
        $response = $this->post('/payment/DeleteCard.idPass', [
            'SiteID'   => $this->config['SiteID'],
            'SitePass' => $this->config['SitePass'],
            'MemberID' => $params['MemberID'],
            'CardSeq'  => $params['CardSeq'],
            'SeqMode'  => $params['SeqMode'] ?? '0'
        ]);

        return new PaymentResponse($response);
    }

    public function execTran(array $params)
    {
        $user = $params['user'];
        // 初回決済の登録
        $response = $this->post('/payment/EntryTran.idPass', [
            'ShopID' => $this->config['ShopID'],
            'ShopPass' => $this->config['ShopPass'],
            'OrderID' => $params['OrderID'],
            'JobCd' => 'CAPTURE',
            'Amount' => $params['Amount'],
            'Tax' => $params['Tax'] ?? 0,
        ]);

        if (!isset($response['AccessID']) || !isset($response['AccessPass'])) {
            throw new \Exception('Failed to get AccessID and AccessPass');
        }

        // 初回決済の実行
        $execResponse = $this->post('/payment/ExecTran.idPass', [
            'AccessID' => $response['AccessID'],
            'AccessPass' => $response['AccessPass'],
            'OrderID' => $params['OrderID'],
            'Method' => '1', // 一括支払い
            'SiteID' => $this->config['SiteID'],
            'SitePass' => $this->config['SitePass'],
            'MemberID' => $params['CustomerID'],
            'CardSeq' => '0',
            'UseCard' => '1'
        ]);

        \Log::error(print_r($execResponse, false));

        return new PaymentResponse(array_merge($response, $execResponse));
    }

    public function createSubscription(array $params)
    {
        // 定期課金の登録
        $response = $this->post('/payment/RegisterRecurringCredit.idPass', [
            'Version' => '1',
            'ShopID' => $this->config['ShopID'],
            'ShopPass' => $this->config['ShopPass'],
            'RecurringID' => $params['RecurringID'], 
            'Amount' => $params['Amount'],
            'RegistType' => 1,
            'Tax' => $params['Tax'] ?? 0,
            'ChargeDay' => $params['ChargeDay'] ?? null, 
            'SiteID' => $this->config['SiteID'],
            'SitePass' => $this->config['SitePass'],
            'MemberID' => $params['CustomerID'],
        ]);

        return new PaymentResponse($response);
    }

    public function cancelSubscription(array $params)
    {
        $response = $this->post('/payment/CancelSubscription.idPass', [
            'ShopID' => $this->config['ShopID'],
            'ShopPass' => $this->config['ShopPass'],
            'AccessID' => $params['AccessID'],
            'AccessPass' => $params['AccessPass'],
            'OrderID' => $params['OrderID']
        ]);

        return new PaymentResponse($response);
    }

    public function searchSubscription(array $params)
    {
        $response = $this->post('/payment/SearchSubscription.idPass', [
            'ShopID' => $this->config['ShopID'],
            'ShopPass' => $this->config['ShopPass'],
            'AccessID' => $params['AccessID'],
            'AccessPass' => $params['AccessPass'],
            'OrderID' => $params['OrderID']
        ]);

        return new PaymentResponse($response);
    }

    public function updateCard(array $params)
    {
        // Save card
        $response = $this->post('/payment/SaveCard.idPass', [
            'SiteID'    => $this->config['SiteID'],
            'SitePass'  => $this->config['SitePass'],
            'MemberID'  => $params['MemberID'],
            'Token'     => $params['Token'],
            'SeqMode'   => $params['SeqMode'] ?? '0',  // デフォルトは0（0始まり）
            'CardSeq'   => $params['CardSeq'] ?? null, // Optional: 上書きする場合
            'DefaultFlag' => $params['DefaultFlag'] ?? '1', // デフォルトカード指定
        ]);

        // If card is saved successfully, search for card details
        if (!isset($response['ErrCode'])) {
            $cardDetails = $this->post('/payment/SearchCard.idPass', [
                'SiteID' => $this->config['SiteID'],
                'SitePass' => $this->config['SitePass'],
                'MemberID' => $params['MemberID'],
                'SeqMode' => '0'
            ]);
            
            if (!isset($cardDetails['ErrCode'])) {
                $response = array_merge($response, $cardDetails);
            }
        }

        return new PaymentResponse($response);
    }

    public function searchMember(array $params)
    {
        $response = $this->post('/payment/SearchMember.idPass', [
            'SiteID' => $this->config['SiteID'],
            'SitePass' => $this->config['SitePass'],
            'MemberID' => $params['MemberID']
        ]);

        return new PaymentResponse($response);
    }

    protected function post($endpoint, array $params)
    {
        try {
            $response = $this->client->post($endpoint, [
                'form_params' => $params,
            ]);

            $body = $response->getBody()->getContents();
            parse_str($body, $result);

            // if (isset($result['ErrCode']) && $result['ErrCode'] !== '') {
            //     throw new \Exception("GMO API Error: {$result['ErrInfo']}, {$endpoint}");
            // }

            return $result;
        } catch (\Exception $e) {
            Log::error('GMO Payment Error: ' . $e->getMessage(), [
                'endpoint' => $endpoint,
                'params' => $params,
            ]);
            throw $e;
        }
    }
} 