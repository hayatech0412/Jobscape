<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Notification>
 */
class NotificationFactory extends Factory
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
            'source_id' => null,
            'target_id' => null,
            'product_id' => null,
            'title' => $this->faker->sentence,
            'content' => $this->faker->sentence,
            'is_read' => 0,
            'read_ids' => null,
        ];
    }
}
