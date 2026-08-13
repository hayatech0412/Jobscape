<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OfficeUpdateRequest extends FormRequest
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
            "office_name"        => ['required', 'string', 'max:32'],
            "office_name_kana"   => ['required', 'string', 'max:32'],
            "coporate_code"      => ['required', 'string', 'size:13'],
            "pref"               => ['required', 'string', 'max:12'],
            "city"               => ['required', 'string', 'max:12'],
            "area"               => ['required', 'string', 'max:12'],
            "street"             => ['required', 'string', 'max:12'],
            "building"           => ['required', 'string', 'max:32'],
            "phone_number"       => ['required', 'string', 'max:12'],
            "first_name"         => ['required', 'string', 'max:12'],
            "first_kana"         => ['required', 'string', 'max:12'],
            "last_name"          => ['required', 'string', 'max:12'],
            "last_kana"          => ['required', 'string', 'max:12'],
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
            "office_name"        => "会社名",
            "office_name_kana"   => "会社名カナ",
            "coporate_code"      => "法人番号",
            "pref"               => "都道府県",
            "city"               => "市区町村",
            "area"               => "町城",
            "street"             => "番地",
            "building"           => "建物名",
            "phone_number"       => "電話番号",
            "first_name"         => "代表者姓",
            "first_kana"         => "代表者姓カナ",
            "last_name"          => "代表者名",
            "last_kana"          => "代表者名カナ",
        ];
    }
}
