<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CoporateCodeRequest extends FormRequest
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
            'coporate_code' => ['required', 'string', 'size:13']
        ];
    }

    public function attributes()
    {
        return [
            'coporate_code' => '法人番号',
        ];
    }
}
