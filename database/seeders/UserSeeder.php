<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Enums\Role;
use App\Enums\UserStatus;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {        
        User::truncate();
        User::create([
            'email' => 'admin@email.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'role' => Role::ADMIN,
            'is_notify' => true,
            'status' => UserStatus::ACTIVE,
        ]);
        User::factory(20)->withIndexedEmails(1)->create();
    }
}
