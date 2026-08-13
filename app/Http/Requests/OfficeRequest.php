<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OfficeRequest extends FormRequest
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
            "office_type"               => ['required', 'numeric'],
            "office_name"               => ['required', 'string', 'max:32'],
            "office_name_kana"          => ['required', 'string', 'max:32'],
            "office_postal_code"        => ['required', 'string', 'max:13'],
            "office_pref"               => ['required', 'string', 'max:12'],
            "office_city"               => ['required', 'string', 'max:255'],
            "office_area"               => ['required', 'string', 'max:255'],
            "office_street"             => ['required', 'string', 'max:255'],
            "office_building"           => ['required', 'string', 'max:255'],
            "office_phone_number"       => ['required', 'string', 'max:12'],
            "office_master_first_name"  => ['required', 'string', 'max:12'],
            "office_master_first_kana"  => ['required', 'string', 'max:12'],
            "office_master_last_name"   => ['required', 'string', 'max:12'],
            "office_master_last_kana"   => ['required', 'string', 'max:12'],
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
            "office_type"               => '支社・支店、事業所',
            "office_name"               => '事業所名',
            "office_name_kana"          => '事業所名カナ',
            "office_postal_code"        => '郵便番号',
            "office_pref"               => '都道府県',
            "office_city"               => '市区町村',
            "office_area"               => '町城',
            "office_street"             => '丁目・番地・号',
            "office_building"           => '建物名・階数・部屋番号',
            "office_phone_number"       => '電話番号',
            "office_master_first_name"  => '事業所代表者姓',
            "office_master_first_kana"  => '事業所代表者姓カナ',
            "office_master_last_name"   => '事業所代表者名',
            "office_master_last_kana"   => '事業所代表者名カナ',
        ];
    }
}
