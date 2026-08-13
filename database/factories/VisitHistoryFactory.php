<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Product;
use App\Models\VisitHistory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Notice>
 */
class VisitHistoryFactory extends Factory
{
    protected $model = VisitHistory::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $this->faker = \Faker\Factory::create('ja_JP');
        return [
            'user_id' => User::where('role', \App\Enums\Role::USER)->inRandomOrder()->first()->id,
            'product_id' => Product::inRandomOrder()->first()->id,
            'visited_at' => $this->faker->datetime(),
        ];
    }
}
