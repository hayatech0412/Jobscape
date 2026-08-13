<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
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
            "categories"                    => ['required', 'array', 'min:1', 'max:3'],
            "name"                          => ['required', 'string', 'max:25'],
            "image"                         => ['required', 'string',],
            "image_file"                    => ['required', 'image', 'max:5120'],
            "attachments"                   => ['required', 'array'],
            "attachments.*.image"           => ['required', 'string'],
            "attachments.*.image_file"      => ['required', 'image', "max:5120"],
            "overview"                      => ['required', 'string', 'max:200'],
            "introduction1"                 => ['required', 'array'],
            "introduction1.image"           => ['required', 'string'],
            "introduction1.image_file"      => ['required', 'image', "max:5120"],
            "introduction1.detail_overview" => ['required', 'string', "max:1000"],
            "introduction2"                 => ['nullable', 'array'],
            "introduction2.image"           => ['nullable', 'string'],
            "introduction2.image_file"      => ['nullable', 'image', "max:5120"],
            "introduction2.detail_overview" => ['nullable', 'string', "max:1000"],
            "youtube_url"                   => ['nullable', 'url', 'max:255'],
            "response_prefs"                => ['required', 'array', 'max:50'],
            "overseas"                      => ['nullable', 'string', 'max:32'],
            "target_type"                   => ['required', 'string'],
            "condition"                     => ['nullable', 'string', 'max:300'],
            "benefits"                      => ['nullable', 'string', 'max:300'],
            "approach"                      => ['required', 'string', 'max:255'],
            "capacity_license"              => ['nullable', 'string', 'max:255'],
            "capacity_code"                 => ['nullable', 'string', 'max:255'],
            "product_code"                  => ['required', 'string', 'max:255'],
            "publish_at"                    => ['required', 'string', 'max:255'],
            "deployes"                      => ['nullable', 'array', 'max:16'],
            "is_recurit_period"             => ['required', 'string', 'max:1'],
            "recurit_start"                 => ['nullable', 'before:recurit_end', 'date', 'max:15'],
            "recurit_end"                   => ['nullable', 'after:recurit_start',  'date', 'max:15'],
            "apply_count"                   => ['required', 'string', 'max:10'],
            "introduction_type"             => ['required', 'string', 'max:1'],
            "reward_type"                   => ['required', 'string', 'max:1'],
            "reward_amount_money"           => ['nullable', 'integer'],
            "reward_amount_percent"         => ['nullable', 'integer'],
            "introduction_condition"        => ['nullable', 'string', 'max:300'],
            "introduction_memo"             => ['nullable', 'string', 'max:300'],
            "transaction_period"            => ['required', 'integer'],
            "transaction_period_unit"       => ['required', 'string', 'max:2'],
            "schedules"                     => ['nullable', 'array', 'max:5'],
            "faqs"                          => ['nullable', 'array', 'max:5'],
        ];
    }

    public function attributes()
    {
        return [
            'categories'                            => 'カテゴリ',
            'name'                                  => '商材名',
            'image'                                 => 'メイン画像',
            'image_file'                            => 'メイン画像',
            "images"                                => '商材資料',
            "images.*.image"                        => '商材資料の画像',
            "images.*.image_file"                   => '商材資料の画像',
            "overview"                              => '概要',
            "introduction1"                         => '商材紹介詳細１',
            "introduction1.image"                   => '商材紹介詳細１の画像',
            "introduction1.image_file"              => '商材紹介詳細１の画像',
            "introduction1.detail_overview"         => '商材紹介詳細１の概要',
            "introduction2"                         => '商材紹介詳細２',
            "introduction2.image"                   => '商材紹介詳細２の画像',
            "introduction2.image_file"              => '商材紹介詳細２の画像',
            "introduction2.detail_overview"         => '商材紹介詳細２の概要',
            "youtube_url"                           => 'YouTubeリンク',
            "response_prefs"                        => '対応地域',
            "response_prefs.*"                      => '対応地域',
            "overseas"                              => '海外',
            "target_type"                           => 'サービス対象者',
            "condition"                             => '条件',
            "approach"                              => '営業アプローチ',
            "benefits"                              => 'サービス特典',
            "test1"                                 => '免許・資格',
            "test2"                                 => '番号',
            "product_code"                          => '出品ID',
            "publish_at"                            => '掲載日・更新日時',
            "deployes"                              => '導入実績',
            "deployes.*"                            => '導入実績',
            "is_recurit_period"                     => '募集期間',
            "recurit_start"                         => '募集開始日',
            "recurit_end"                           => '募集終了日',
            "apply_count"                           => '募集件数',
            "introduction_type"                     => '対象紹介会員',
            "reward_type"                           => '紹介手数料タイプ',
            "reward_amount_money"                   => '固定金額',
            "reward_amount_percent"                 => '成功報酬率',
            "introduction_condition"                => '条件',
            "introduction_memo"                     => '紹介者へお願い',
            "transaction_period"                    => '平均取引期間',
            "transaction_period_unit"               => '平均取引期間単位',
            "schedules"                             => 'スケジュール',
            "faqs"                                  => 'よくある質問',
            "attachments"                           => '商材資料',
        ];
    }
}
