<?php

namespace App\Http\Requests\Auth;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PaymentMethodRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'card_number' => ['required', 'string', 'max:255'],
            'limit_at' => ['required', 'string'],  
            'security_code' => ['required', 'integer'],
            'is_checked' => ['required', 'accepted'],
            'token' => ['required'],
        ];
    }

    /**
     * Get custom error messages for validation.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'is_checked.accepted' => '確認事項に同意する必要があります。',
        ];
    }
        
    public function attributes()
    {
        return [
            'card_number' => 'カード番号',
            'limit_at' => '有効期限',
            'security_code' => 'セキュリティコード',
            'payment_type' => '支払い区分',
            'token' => 'トークン',
        ];
    }

    protected function prepareForValidation()
    {
        // CSRFトークンを検証しない
        $this->headers->set('X-CSRF-TOKEN', csrf_token());
    }
}
