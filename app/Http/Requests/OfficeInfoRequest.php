<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OfficeInfoRequest extends FormRequest
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
            'employee_count'    => ['required', 'numeric', 'max:101'],
            'earning_amount'    => ['required', 'numeric', 'max:7'],
            'main_category'     => ['required', 'numeric', 'max:20'],
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
            'employee_count'    => '從業員数',
            'earning_amount'    => '年間売上',
            'main_category'     => '主な商材',
        ];
    }
}
