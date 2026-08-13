<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Profile;
use App\Models\Plan;
use App\Models\User;
use App\Enums\Gender;
use App\Enums\UserType;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class ProfileFactory extends Factory
{
    protected $model = Profile::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $this->faker = \Faker\Factory::create('ja_JP');
        $area_categories = config('values.area_categories');

        return [
            'user_id' => User::where('role', \App\Enums\Role::USER)->inRandomOrder()->first()->id,
            'plan_id' => Plan::inRandomOrder()->first()->id,
            'user_type' => $this->faker->randomElement([UserType::PERSON, UserType::CORPORATION, UserType::PROPRIETOR]),
            'first_name' => $this->faker->firstName,  // ランダムな日本語の名前（名）
            'last_name' => $this->faker->lastName,  // ランダムな日本語の名前（姓）
            'nickname' => $this->faker->userName,  // ランダムなユーザー名（ニックネーム）
            'phone_number' => $this->faker->phoneNumber,  // ランダムな電話番号
            'birthday' => $this->faker->date('Y-m-d'),
            'gender' => $this->faker->randomElement([Gender::MALE, Gender::FEMALE]),
        ];
    }
}
