<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CompanyBusinessInfoUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'business_type' => 'nullable|integer|max:255',
            'office_name' => 'nullable|string|max:255|regex:/^[ぁ-んァ-ン一-龯ー々〆〤a-zA-Z0-9\s]+$/u',
            'office_kana' => 'nullable|string|max:255|regex:/^[ァ-ヶー]+$/u',
            'coporate_code' => 'nullable|string|max:255',
            'site_url' => 'nullable|url|max:255',
            'office_postal_code' => 'nullable|string|max:20',
            'office_pref' => 'nullable|string|max:50',
            'office_city' => 'nullable|string|max:100',
            'office_area' => 'nullable|string|max:100',
            'office_street' => 'nullable|string|max:255',
            'office_building' => 'nullable|string|max:255',
            'office_phone_number' => 'nullable|string|max:20',
            'invoice_number' => 'nullable|string|max:50',
            'office_master_last_name' => 'nullable|string|max:255|regex:/^[ぁ-んァ-ン一-龯ー々〆〤a-zA-Z0-9]+$/u',
            'office_master_first_name' => 'nullable|string|max:255|regex:/^[ぁ-んァ-ン一-龯ー々〆〤a-zA-Z0-9]+$/u',
            'office_master_last_kana' => 'nullable|string|max:255|regex:/^[ァ-ヶー]+$/u',
            'office_master_first_kana' => 'nullable|string|max:255|regex:/^[ァ-ヶー]+$/u',
            
            // 管理者情報のバリデーション
            'managers' => 'array|max:3', // 最大3名まで
            'managers.*.first_name' => 'nullable|string|max:255|regex:/^[ぁ-んァ-ン一-龯ー々〆〤a-zA-Z0-9]+$/u',
            'managers.*.last_name' => 'nullable|string|max:255|regex:/^[ぁ-んァ-ン一-龯ー々〆〤a-zA-Z0-9]+$/u',
            'managers.*.first_kana' => 'nullable|string|max:255|regex:/^[ァ-ヶー]+$/u',
            'managers.*.last_kana' => 'nullable|string|max:255|regex:/^[ァ-ヶー]+$/u',
            'managers.*.phone_number' => 'nullable|string|max:20',
            'managers.*.email' => 'nullable|email|max:255',
            'managers.*.card_front' => 'nullable|string',
            'managers.*.card_front_path' => 'nullable|string',
            'managers.*.card_back' => 'nullable|string',
            'managers.*.card_back_path' => 'nullable|string',
        ];
    }

    /**
     * Get custom error messages for validation.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            // 'managers.max' => '管理者情報は最大3名まで入力できます。',
            // 'managers.*.first_name.max' => '姓の文字数は255文字以内で入力してください。',
            // 'managers.*.last_name.max' => '名の文字数は255文字以内で入力してください。',
            // 'managers.*.first_kana.max' => '姓（かな）の文字数は255文字以内で入力してください。',
            // 'managers.*.last_kana.max' => '名（かな）の文字数は255文字以内で入力してください。',
            // 'managers.*.phone_number.max' => '電話番号は20文字以内で入力してください。',
            // 'managers.*.email.email' => '有効なメールアドレスを入力してください。',
            // 'managers.*.email.max' => 'メールアドレスは255文字以内で入力してください。',
            // 'managers.*.card_front.max' => 'カードの表面画像は文字数制限を超えません。',
            // 'managers.*.card_front_path.max' => 'カードの表面画像パスは文字数制限を超えません。',
            // 'managers.*.card_back.max' => 'カードの裏面画像は文字数制限を超えません。',
            // 'managers.*.card_back_path.max' => 'カードの裏面画像パスは文字数制限を超えません。',
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
            'business_type' => '事業タイプ',
            'office_name' => '事務所名',
            'office_kana' => '事務所名（かな）',
            'coporate_code' => '法人コード',
            'site_url' => 'ウェブサイトURL',
            'office_postal_code' => '事務所郵便番号',
            'office_pref' => '事務所都道府県',
            'office_city' => '事務所市区町村',
            'office_area' => '事務所エリア',
            'office_street' => '事務所通り名',
            'office_building' => '事務所ビル名',
            'office_phone_number' => '事務所電話番号',
            'invoice_number' => '事務所請求書番号',
            'office_master_last_name' => '事務所代表者（姓）',
            'office_master_first_name' => '事務所代表者（名）',
            'office_master_last_kana' => '事務所代表者（姓かな）',
            'office_master_first_kana' => '事務所代表者（名かな）',
            'managers' => '管理者',
            'managers.*.first_name' => '管理者（姓）',
            'managers.*.last_name' => '管理者（名）',
            'managers.*.first_kana' => '管理者（姓かな）',
            'managers.*.last_kana' => '管理者（名かな）',
            'managers.*.phone_number' => '管理者（電話番号）',
            'managers.*.email' => '管理者（メールアドレス）',
            'managers.*.card_front' => '管理者（カード表面画像）',
            'managers.*.card_front_path' => '管理者（カード表面画像パス）',
            'managers.*.card_back' => '管理者（カード裏面画像）',
            'managers.*.card_back_path' => '管理者（カード裏面画像パス）',
        ];
    }
}
