<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class IntroductionFormRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'target_last_name' => ['required', 'string', 'max:255', 'regex:/^[ぁ-んァ-ン一-龯々ー\s]+$/u'],
            'target_first_name' => ['required', 'string', 'max:255', 'regex:/^[ぁ-んァ-ン一-龯々ー\s]+$/u'],
            'target_last_kana' => ['required', 'string', 'max:255', 'regex:/^[ァ-ヶー]+$/u'],  
            'target_first_kana' => ['required', 'string', 'max:255', 'regex:/^[ァ-ヶー]+$/u'], 
            'contact_with' => ['required', 'integer'],
            'target_email' => ['required', 'string', 'email', 'confirmed'],
            'target_phone_number' => ['required', 'string', 'max:12'],  
            'target_post_number' => ['nullable', 'string', 'max:255', 'min:7'],  
            'target_pref' => ['nullable', 'string', 'max:255'],
            'target_city' => ['nullable', 'string', 'max:255'],
            'target_area' => ['nullable', 'string', 'max:255'],
            'target_street' => ['nullable', 'string', 'max:255'],
            'target_building' => ['nullable', 'string', 'max:255'],
            'is_checked' => ['required', 'boolean', 'accepted'],
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
            'is_checked.accepted' => 'ご同意の上送信してください。',
        ];
    }
        
    public function attributes()
    {
        return [
            'target_last_name' => '姓',
            'target_first_name' => '名',
            'target_last_kana' => '姓カナ',
            'target_first_kana' => '名カナ',
            'contact_with' => 'ご希望の連絡方法',
            'target_email' => 'メールアドレス',
            'target_email_confirmation' => 'メールアドレス再入力',
            'target_phone_number' => '電話番号',
            'target_post_number' => '郵便番号',
            'target_pref' => '都道府県',
            'target_city' => '市区町村',
            'target_street' => '番地・ビル名',
            'is_checked' => '同意',
        ];
    }
}
