<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class SmsVerifyRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'sms_verify_code' => ['required', 'string', 'min:6'],
        ];
    }
        
    public function attributes()
    {
        return [
            'sms_verify_code' => '認証番号',
        ];
    }
}
