<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Carbon\Carbon;

class BankInfoRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'bank_name' => ['required', 'string', 'max:255'],
            'account_type' => ['required', 'string', 'max:255'],
            'shop_code' => ['required', 'string', 'max:255'],
            'account_code' => ['required', 'string', 'max:255', 'min:7'],
            'account_last_name' => ['required', 'string', 'max:255', 'regex:/^[ぁ-んァ-ン一-龯ー々〆〤a-zA-Z]+$/u'],
            'account_first_name' => ['required', 'string', 'max:255', 'regex:/^[ぁ-んァ-ン一-龯ー々〆〤a-zA-Z]+$/u'],
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
            'bank_name' => '銀行',
            'account_type' => '口座種別',
            'shop_code' => '支店コード',
            'account_code' => '口座番号',
            'account_last_name' => '口座名義(セイ)',
            'account_first_name' => '口座名義(メイ)',
        ];
    }
}
