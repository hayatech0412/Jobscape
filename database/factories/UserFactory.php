<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;
use App\Models\Plan;
use App\Models\Company;
use App\Models\Category;
use App\Models\Profile;
use App\Enums\Role;
use App\Enums\UserStatus;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    protected $model = User::class;

    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $this->faker = \Faker\Factory::create('ja_JP');

        return [
            'email' => $this->faker->unique()->safeEmail,
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'role' => $this->faker->randomElement([Role::COMPANY, Role::USER]),
            'is_notify' => $this->faker->boolean(),
            'status' => $this->faker->randomElement([UserStatus::ACTIVE, UserStatus::INACTIVE]),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    /**
     * Generate users with indexed emails.
     */
    public function withIndexedEmails(int $startIndex = 1): static
    {
        return $this->state(new Sequence(
            fn ($sequence) => [
                'email' => 'user' . ($startIndex + $sequence->index) . '@email.com',
            ]
        ));
    }

    public function configure()
    {        
        return $this->afterCreating(function (User $user) {            
            if ($user->role == Role::USER) {              
                Profile::factory()->create([
                    'user_id' => $user->id,  // ユーザーIDをプロフィールに設定
                ]);
            } else {
                Company::factory()->create([
                    'user_id' => $user->id,  // ユーザーIDをプロフィールに設定
                ]);
            }
        });
    }
}
