<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Company;

class CompanyUserSeeder extends Seeder
{
    public function run(): void
    {
        // Find company role user
        $user = User::where('email', 'user1@email.com')->first();
        
        if ($user && !$user->company) {
            Company::create([
                'user_id' => $user->id,
                'coporate_name' => 'テスト企業株式会社',
                'coporate_kana' => 'テストキギョウカブシキガイシャ',
                'phone_number' => '03-1234-5678',
                'first_name' => 'テスト',
                'last_name' => '太郎',
                'first_kana' => 'テスト',
                'last_kana' => 'タロウ',
            ]);
            
            echo "Company profile created for user1@email.com\n";
        } else {
            echo "Company profile already exists or user not found\n";
        }
    }
}