<?php

namespace App\Http\Requests\Auth;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Carbon\Carbon;

class MainInfoRequest extends FormRequest
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
            'user_type' => ['required', 'integer'],
            'last_name' => ['required', 'string', 'max:255', 'regex:/^[ぁ-んァ-ン一-龯々ー\s]+$/u'],
            'first_name' => ['required', 'string', 'max:255', 'regex:/^[ぁ-んァ-ン一-龯々ー\s]+$/u'],
            'last_kana' => ['required', 'string', 'max:255', 'regex:/^[ァ-ヶー]+$/u'],  
            'first_kana' => ['required', 'string', 'max:255', 'regex:/^[ァ-ヶー]+$/u'], 
            'birthday' => ['required', 'date', 'before_or_equal:' . $eighteenYearsAgo], // 18歳以上の検証
            'gender' => ['nullable', 'integer'],
            'is_notify' => ['nullable', 'boolean'],
            'post_number' => ['required', 'string', 'max:255'],
            'pref' => ['required', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:255'],
            'area' => ['required', 'string', 'max:255'],
            'street' => ['required', 'string', 'max:255'],
            'building' => ['required', 'string', 'max:255'],
        
            // `user_type` が2または3の場合に必須となるフィールド
            'business_company_name' => ['required_if:user_type,2', 'string', 'max:255'],
            'business_name' => ['required_if:user_type,2,3', 'string', 'max:255', 'regex:/^[ぁ-んァ-ン一-龯ー々〆〤a-zA-Z0-9]+$/u'],
            'business_kana' => ['required_if:user_type,2,3', 'string', 'max:255', 'regex:/^[ァ-ン一-龯ー々〆〤a-zA-Z]+$/u'],
            'business_number' => ['required_if:user_type,2', 'string', 'max:255'],
            'business_post_number' => ['required_if:user_type,2,3', 'string', 'max:255'],
            'business_pref' => ['required_if:user_type,2,3', 'string', 'max:255'],
            'business_city' => ['required_if:user_type,2,3', 'string', 'max:255'],
            'business_area' => ['required_if:user_type,2,3', 'string', 'max:255'],
            'business_street' => ['required_if:user_type,2,3', 'string', 'max:255'],
            'business_building' => ['required_if:user_type,2,3', 'string', 'max:255'],
            'business_phone_number' => ['required_if:user_type,2,3', 'string', 'max:12'],
            'business_invoice_number' => ['required_if:user_type,2,3', 'string', 'max:255'],
            'business_master_first_name' => ['required_if:user_type,2,3', 'string', 'max:255', 'regex:/^[ぁ-んァ-ン一-龯々ー\s]+$/u'],
            'business_master_last_name' => ['required_if:user_type,2,3', 'string', 'max:255', 'regex:/^[ぁ-んァ-ン一-龯々ー\s]+$/u'],
            'business_master_first_kana' => ['required_if:user_type,2,3', 'string', 'max:255', 'regex:/^[ァ-ヶー]+$/u'],
            'business_master_last_kana' => ['required_if:user_type,2,3', 'string', 'max:255', 'regex:/^[ァ-ヶー]+$/u'],
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
            'birthday.before_or_equal' => '18歳以上の生年月日を入力してください。',
            'birthday.date' => '有効な日付を入力してください。',
            
            'business_company_name.required_if' => '法人名は必須です。',
            'business_name.required_if' => '法人名・屋号は必須です。',
            'business_kana.required_if' => '法人名・屋号カナは必須です。',
            'business_number.required_if' => '法人番号は必須です。',
            'business_post_number.required_if' => '事業所郵便番号は必須です。',
            'business_pref.required_if' => '事業所都道府県は必須です。',
            'business_city.required_if' => '事業所市区町村は必須です。',
            'business_area.required_if' => '事業所町域は必須です。',
            'business_street.required_if' => '事業所丁目・番地・号は必須です。',
            'business_building.required_if' => '事業所建物名・階数・部屋番号は必須です。',
            'business_phone_number.required_if' => '事業所電話番号は必須です。',
            'business_invoice_number.required_if' => 'インボイス登録番号は必須です。',
            'business_master_first_name.required_if' => '代表者名は必須です。',
            'business_master_last_name.required_if' => '代表者姓は必須です。',
            'business_master_first_kana.required_if' => '代表者名カナは必須です。',
            'business_master_last_kana.required_if' => '代表者姓カナは必須です。',
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
            'user_type' => '事業形態',
            'last_name' => '姓',
            'first_name' => '名',
            'last_kana' => '姓カナ',
            'first_kana' => '名カナ',
            'birthday' => '生年月日',
            'gender' => '性別',
            'is_notify' => '通知設定',
            'post_number' => '郵便番号',
            'pref' => '都道府県',
            'city' => '市区町村',
            'area' => '町域',
            'street' => '丁目・番地・号',
            'building' => '建物名・階数・部屋番号',
            'business_company_name' => '法人呼称',
            'business_name' => '法人名',
            'business_kana' => '法人名カナ',
            'business_number' => '法人番号',
            'business_post_number' => '事業所郵便番号',
            'business_pref' => '事業所都道府県',
            'business_city' => '事業所市区町村',
            'business_area' => '事業所町域',
            'business_street' => '事業所丁目・番地・号',
            'business_building' => '事業所建物名・階数・部屋番号',
            'business_phone_number' => '事業所電話番号',
            'business_invoice_number' => 'インボイス登録番号',
            'business_master_first_name' => '代表者名',
            'business_master_last_name' => '代表者姓',
            'business_master_first_kana' => '代表者名カナ',
            'business_master_last_kana' => '代表者姓カナ',
        ];
    }
}
