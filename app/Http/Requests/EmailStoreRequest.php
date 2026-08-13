<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EmailStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth('web')->check() || auth('admin')->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $id = auth('web')->user()->id ?? request()->route('user')->id;
        return [
            'email' => 'required|string|email|max:255|unique:users,email,'.$id,
        ];
    }

    public function attributes()
    {
        return [
            'email' => __('メールアドレス'),
        ];
    }
}
