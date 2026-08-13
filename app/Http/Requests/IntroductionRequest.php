<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Carbon\Carbon;

class IntroductionRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'contact_type' => ['required', 'boolean', 'accepted'],
            'is_target_agree' => ['required', 'boolean', 'accepted'],
            'is_encrypt' => ['required', 'boolean', 'accepted'],
            'user_memo' => ['nullable', 'string', 'max:500'],
            'target_memo' => ['nullable', 'string', 'max:500'],
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
            'contact_type.accepted' => '商材提供企業から直接連絡します。',
            'is_target_agree.accepted' => '同意を必ず得なければなりません。',
            'is_encrypt.accepted' => '情報は保持できません。',
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
            'contact_type' => '銀行',
            'is_target_agree' => '口座種別',
            'is_encrypt' => '支店コード',
            'user_memo' => '口座番号',
            'target_memo' => '自分用メモ',
        ];
    }
}
