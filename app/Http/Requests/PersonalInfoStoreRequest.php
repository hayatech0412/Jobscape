<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Carbon\Carbon;

class PersonalInfoStoreRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $eighteenYearsAgo = Carbon::now()->subYears(18)->toDateString();

        return [
            'last_name' => ['required', 'string', 'max:255', 'regex:/^[ぁ-んァ-ン一-龯々ー\s]+$/u'],
            'first_name' => ['required', 'string', 'max:255', 'regex:/^[ぁ-んァ-ン一-龯々ー\s]+$/u'],
            'last_kana' => ['required', 'string', 'max:255', 'regex:/^[ァ-ヶー]+$/u'],  
            'first_kana' => ['required', 'string', 'max:255', 'regex:/^[ァ-ヶー]+$/u'], 
            'post_number' => ['nullable', 'string', 'max:255'],
            'birthday' => ['nullable', 'date', 'before_or_equal:' . $eighteenYearsAgo],
            'gender' => ['nullable', 'integer'],
            'country' => ['nullable', 'string', 'max:255'],
            'pref' => ['nullable', 'string', 'max:255'],
            'city' => ['nullable', 'string', 'max:255'],
            'area' => ['nullable', 'string', 'max:255'],
            'street' => ['nullable', 'string', 'max:255'],
            'building' => ['nullable', 'string', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'birthday.before_or_equal' => '18歳以上のみご利用いただけます。',
            'birthday.date' => '有効な日付を入力してください。',
        ];
    }
        
    public function attributes()
    {
        return [
            'last_name' => '姓',
            'first_name' => '名',
            'last_kana' => '姓カナ',
            'first_kana' => '名カナ',
            'birthday' => '生年月日',
            'gender' => '性別',
            'post_number' => '郵便番号',
            'country' => 'お住まいの国',
            'pref' => '都道府県',
            'city' => '市区町村',
            'area' => '町域',
            'street' => '丁目・番地・号',
            'building' => '建物名・階数・部屋番号',
        ];
    }
}
