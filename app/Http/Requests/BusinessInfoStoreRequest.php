<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class BusinessInfoStoreRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'user_type' => ['required', 'integer'],
            'business_name' => ['nullable', 'string', 'max:255', 'regex:/^[ぁ-んァ-ン一-龯ー々〆〤a-zA-Z]+$/u'],
            'business_kana' => ['nullable', 'string', 'max:255', 'regex:/^[ァ-ン一-龯ー々〆〤a-zA-Z]+$/u'],
            'business_pref' => ['nullable', 'string', 'max:255'],
            'business_city' => ['nullable', 'string', 'max:255'],
            'business_area' => ['nullable', 'string', 'max:255'],
            'business_street' => ['nullable', 'string', 'max:255'],
            'business_building' => ['nullable', 'string', 'max:255'],
            'business_phone_number' => ['nullable', 'string', 'max:12'],
            'business_invoice_number' => ['nullable', 'string', 'max:255'],
        ];
    }
        
    public function attributes()
    {
        return [
            'user_type' => '事業形態',
            'business_name' => '事業者名・屋号',
            'business_kana' => '事業者名・屋号ガナ',
            'business_pref' => '都道府県',
            'business_city' => '市区町村',
            'business_area' => '町域',
            'business_street' => '丁目・番地・号',
            'business_building' => '建物名・階数・部屋番号',
            'business_phone_number' => '電話番号',
            'business_invoice_number' => 'インボイス番号',
        ];
    }
}
