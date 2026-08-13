<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CompanyAccountRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
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
            'email'             => ['required', 'string', 'email'],
            'password'          => ['nullable', 'string', 'min:8'],
            'avatar'            => ['nullable', 'string', 'max:255'],
            'avatar_file'       => ['nullable', 'image', 'max:53120'],
            'company'           => ['nullable', 'array'],
            'company.summary'   => ['nullable', 'string', 'max:300'],
            'company.overview'  => ['nullable', 'string', 'max:500'],
        ];
    }

    /**
     * Get custom attribute names.
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'email'             => 'メールアドレス',
            'password'          => 'パスワード',
            'company.summary'   => '紹介文',
            'company.overview'  => '会社概要',
        ];
    }
}
