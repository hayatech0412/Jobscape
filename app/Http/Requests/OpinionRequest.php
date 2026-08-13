<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class OpinionRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nickname' => ['required', 'string', 'max:255'],
            'use_type' => ['required', 'integer', Rule::in(\App\Enums\UseType::getValues())],
            'use_type_other' => ['nullable', 'required_if:use_type,' . \App\Enums\UseType::OTHER, 'string', 'max:255'],
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string', 'max:2000'],
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
            'use_type_other.required_if' => '「その他」の場合、入力してください。',
        ];
    }

    public function attributes()
    {
        return [
            'nickname' => 'ニックネームまたは氏名',
            'use_type' => '利用方式',
            'use_type_other' => '「その他」の場合',
            'title' => 'タイトル',
            'content' => '内容',
        ];
    }
}
