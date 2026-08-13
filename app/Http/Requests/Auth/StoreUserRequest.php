<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        // 基本的に、リクエストを許可する場合はtrueを返す
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email' => 'required|string|lowercase|email|max:255|unique:'.\App\Models\User::class,
            'password' => ['required', Rules\Password::defaults()],
            "vite_code"  => ['nullable', 'string', 'max:255'],
        ];
    }

    public function attributes()
    {
        return [
            'email' => 'メールアドレス',
            'password' => 'パスワード',
            'vite_code' => '招待コード',
        ];
    }
}

