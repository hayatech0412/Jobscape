<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CompanyRequest extends FormRequest
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
            "nickname"          => ['required', 'string', 'max:32'],
            "coporate_name"     => ['required', 'string', 'max:32'],
            "coporate_kana"     => ['required', 'string', 'max:32'],
            "coporate_code"     => ['required', 'string', 'size:13'],
            "postal_code"       => ['required', 'string', 'max:12'],
            "pref"              => ['required', 'string', 'max:12'],
            "city"              => ['required', 'string', 'max:255'],
            "city_kana"         => ['required', 'string', 'max:255'],
            "area"              => ['required', 'string', 'max:255'],
            "area_kana"         => ['required', 'string', 'max:255'],
            "street"            => ['required', 'string', 'max:255'],
            "building"          => ['required', 'string', 'max:255'],
            "building_kana"     => ['nullable', 'string', 'max:255'],
            "phone_number"      => ['required', 'string', 'max:12'],
            "is_site_url"       => ['nullable'],
            "site_url"          => ['nullable', 'url', 'max:255'],
            "is_pamphlet"       => ['nullable'],
            "pamphlet"          => ['nullable', 'string', 'max:255'],
            "pamphlet_file"     => ['nullable', 'file', 'max:51230'],
            "invoice_number"    => ['nullable', 'string', 'max:15'],
            "first_name"        => ['required', 'string', 'max:32'],
            "first_kana"        => ['required', 'string', 'max:32'],
            "last_name"         => ['required', 'string', 'max:32'],
            "last_kana"         => ['required', 'string', 'max:32'],
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
            "nickname"          => '法人呼称',
            "coporate_name"     => '法人名',
            "coporate_kana"     => '法人名カナ',
            "coporate_code"     => '法人番号',
            "postal_code"       => '郵便番号',
            "pref"              => '都道府県',
            "city"              => '市区町村',
            "city_kana"         => '市区町村カナ',
            "area"              => '町城',
            "area_kana"         => '町城カナ',
            "street"            => '丁目・番地・号',
            "building"          => '建物名・階数・部屋番号',
            "building_kana"     => '建物名・階数・部屋番号カナ',
            "phone_number"      => '電話番号',
            "site_url"          => 'webサイトリンク',
            "pamphlet"          => 'パンフレットテータ',
            "pamphlet_file"     => 'パンフレットテータ',
            "invoice_number"    => 'インポイス登録番号',
            "first_name"        => '代表者姓',
            "first_kana"        => '代表者姓カナ',
            "last_name"         => '代表者名',
            "last_kana"         => '代表者名カナ',
        ];
    }
}
