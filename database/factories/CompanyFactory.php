<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Enums\OfficeType;
use App\Enums\CompanyEarning;
use App\Enums\CompanyEmployee;
use App\Models\Category;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Company>
 */
class CompanyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $this->faker = \Faker\Factory::create('ja_JP');

        return [
            'user_id' => User::where('role', \App\Enums\Role::COMPANY)->inRandomOrder()->first()->id,
            'coporate_code' => $this->faker->unique()->numerify('#############'),       // ランダムな法人コード（13桁）
            'nickname' => $this->faker->companySuffix,                                  // 会社名のサフィックスを使ったニックネーム
            'coporate_name' => $this->faker->unique()->numerify('##########'),          // ランダムな法人コード（10桁）
            'coporate_kana' => $this->faker->unique()->numerify('##########'),          // ランダムな法人コード（10桁）
            'postal_code' => $this->faker->postcode,                                    // ランダムな郵便番号
            'pref' => $this->faker->randomElement(config('values.prefectures')),        // ランダムに都道府県
            'city' => $this->faker->city,                                               // ランダムな市区町村
            'area' => $this->faker->streetName,                                         // ランダムなエリア名
            'street' => $this->faker->streetAddress,                                    // ランダムな住所
            'building' => $this->faker->secondaryAddress,                               // ランダムな建物名
            'pref_kana' => $this->faker->kanaName,                                      // 都道府県のカナ
            'city_kana' => $this->faker->kanaName,                                      // 市区町村のカナ
            'area_kana' => $this->faker->kanaName,                                      // エリアのカナ
            'street_kana' => $this->faker->kanaName,                                    // 番地のカナ
            'building_kana' => $this->faker->kanaName,                                  // 建物のカナ
            'phone_number' => $this->faker->phoneNumber,                                // ランダムな電話番号
            'first_name' => $this->faker->firstName,                                    // ランダムな名
            'last_name' => $this->faker->lastName,                                      // ランダムな姓
            'site_url' => $this->faker->url,                                            // ランダムなウェブサイトURL
            'pamphlet' => '',                                                           // パンフレットファイル名
            'pamphlet_path' => '',                                                      // パンフレットファイルパス
            'invoice_number' => $this->faker->unique()->numerify('INV-#####'),          // ランダムな請求書番号
            'office_type' => $this->faker->randomElement(OfficeType::getValues()),      // ランダムなオフィスタイプ
            'office_name' => $this->faker->company,                                     // ランダムな会社名
            'office_postal_code' => $this->faker->postcode,                             // ランダムな郵便番号
            'office_pref' => $this->faker->randomElement(config('values.prefectures')), // 事務所の都道府県
            'office_city' => $this->faker->city,                                        // 事務所の市区町村
            'office_area' => $this->faker->streetName,                                  // 事務所のエリア名
            'office_street' => $this->faker->streetAddress,                             // 事務所の住所
            'office_building' => $this->faker->secondaryAddress,                        // 事務所の建物名
            'office_phone_number' => $this->faker->phoneNumber,                         // 事務所の電話番号
            'office_master_first_name' => $this->faker->firstName,                      // 事務所責任者の名
            'office_master_last_name' => $this->faker->lastName,                        // 事務所責任者の姓
            'employee_count' => $this->faker->randomElement(CompanyEmployee::getValues()),  // ランダムな従業員数
            'earning_amount' => $this->faker->randomElement(CompanyEarning::getValues()),  // ランダムな従業員数
            'category_id' => Category::inRandomOrder()->first()->id,
        ];
    }
}
