<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Company;
use \App\Enums\RewardType;
use \App\Enums\Approach;
use App\Enums\PeriodUnit;
use App\Enums\ProductApproach;
use \App\Enums\ProductStatus;
use App\Enums\TargetType;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $this->faker = \Faker\Factory::create('ja_JP');
        $prefs = config('values.prefectures');

        return [
            'company_id' => Company::inRandomOrder()->first()->id,
            'name' => $this->faker->word,
            'image' => $this->faker->imageUrl(),
            'custom_category' => $this->faker->word,
            'overview' => $this->faker->sentence,
            'introduction1' => [
                'image' => $this->faker->word,
                'image_path' => $this->faker->imageUrl(),
                'detail_overview' => $this->faker->sentence,
            ],
            'introduction2' => [
                'image' => $this->faker->word,
                'image_path' => $this->faker->imageUrl(),
                'detail_overview' => $this->faker->sentence,
            ],
            'youtube_url' => $this->faker->url,
            'response_prefs' => $this->faker->randomElements($prefs, random_int(1, 10)),
            'overseas' => $this->faker->randomElements(['A', 'B', 'C'], 3),
            'target_type' => $this->faker->randomElement(TargetType::getValues()),
            'condition' => $this->faker->sentence,
            'approach' => Approach::getDescription($this->faker->randomElement(ProductApproach::getValues())),
            'benefits' => $this->faker->sentence,
            'product_code' => $this->faker->unique()->numerify('##########'),
            'publish_at' => $this->faker->date(),
            'is_recurit_period' => $this->faker->randomElement(['0', '1']),
            'recurit_start' => $this->faker->date(),
            'recurit_end' => $this->faker->date(),
            'apply_count' => $this->faker->numberBetween(0, 100),
            'introduction_type' => $this->faker->randomElement(TargetType::getValues()),
            'reward_type' => $this->faker->randomElement(RewardType::getValues()),
            'reward_amount' => $this->faker->numberBetween(0, 100),
            'introduction_condition' => $this->faker->sentence,
            'introduction_memo' => $this->faker->sentence,
            'transaction_period' => $this->faker->numberBetween(0, 30),
            'transaction_period_unit' => $this->faker->randomElement(PeriodUnit::getValues()),
            'is_draft' => $this->faker->boolean,
            'is_pickup' => $this->faker->boolean,
            'status' => $this->faker->randomElement(ProductStatus::getValues()),
        ];
    }
}
