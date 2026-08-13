<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class EmailVerifyRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'verify_token' => ['required', 'string', 'min:6', 'max:6'],
        ];
    }
        
    public function attributes()
    {
        return [
            'verify_token' => '認証コード',
        ];
    }
}
