<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Carbon\Carbon;

class AmountInfoRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'amount' => ['required', 'integer'],
            'request_amount' => ['required', 'integer', 'min:1300'],
            'amount_fee' => ['required', 'integer'],
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
            'amount' => '振込金額',
            'request_amount' => '振込申請金額',
            'amount_fee' => '振込手数料',
        ];
    }
}
