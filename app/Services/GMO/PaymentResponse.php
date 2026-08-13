<?php

namespace App\Services\GMO;

class PaymentResponse
{
    protected $data;

    public function __construct(array $data)
    {
        $this->data = $data;
    }

    public function isError()
    {
        return isset($this->data['ErrCode']) && $this->data['ErrCode'] !== '';
    }

    public function getMessage()
    {
        return $this->isError() ? ($this->data['ErrInfo'] ?? 'Unknown error') : '';
    }

    public function getErrorCode()
    {
        return $this->data['ErrCode'] ?? null;
    }

    public function __get($name)
    {
        return $this->data[$name] ?? null;
    }

    public function getData()
    {
        return $this->data;
    }
} 