<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Carbon\Carbon;

class AccountInfoRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $eighteenYearsAgo = Carbon::now()->subYears(18)->toDateString();

        return [
            'nickname' => ['nullable', 'string', 'max:20', 'regex:/^[ぁ-んァ-ン一-龯ー々〆〤a-zA-Z0-9]+$/u'],
            'appeal_statement' => ['nullable', 'string', 'max:50'],
            'introduction' => ['nullable', 'string', 'max:1000'],
            'extra_email' => ['nullable', 'string', 'email'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2048',],
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
            'nickname' => 'ニックネーム',
            'appeal_statement' => 'アピール文',
            'introduction' => '自己紹介文',
            'extra_email' => '追加メールアドレス',
            'image' => '画像',
        ];
    }
}
