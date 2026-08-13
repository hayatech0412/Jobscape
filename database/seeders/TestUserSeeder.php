<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Enums\Role;
use App\Enums\UserStatus;
use App\Models\User;
use App\Models\Profile;
use App\Models\Company;

class TestUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {        
        // Delete existing test users if they exist
        User::whereIn('email', [
            'test.admin@example.com',
            'test.user@example.com', 
            'test.company@example.com'
        ])->delete();
        
        // Create test admin user
        $admin = User::firstOrCreate(
            ['email' => 'test.admin@example.com'],
            [
                'email_verified_at' => now(),
                'password' => Hash::make('test123'),
                'role' => Role::ADMIN,
                'is_notify' => true,
                'status' => UserStatus::ACTIVE,
            ]
        );
        
        // Create test regular user
        $user = User::firstOrCreate(
            ['email' => 'test.user@example.com'],
            [
                'email_verified_at' => now(),
                'password' => Hash::make('test123'),
                'role' => Role::USER,
                'is_notify' => true,
                'status' => UserStatus::ACTIVE,
            ]
        );
        
        // Create profile for regular user
        Profile::firstOrCreate(
            ['user_id' => $user->id],
            [
                'first_name' => 'テスト',
                'last_name' => 'ユーザー',
                'first_kana' => 'テスト',
                'last_kana' => 'ユーザー',
                'phone_number' => '090-1234-5678',
                'post_number' => '123-4567',
                'pref' => '東京都',
                'city' => '渋谷区',
                'area' => '渋谷',
                'street' => '1-1-1',
                'building' => 'テストビル',
            ]
        );
        
        // Create test company user
        $company = User::firstOrCreate(
            ['email' => 'test.company@example.com'],
            [
                'email_verified_at' => now(),
                'password' => Hash::make('test123'),
                'role' => Role::COMPANY,
                'is_notify' => true,
                'status' => UserStatus::ACTIVE,
            ]
        );
        
        // Create company profile
        Company::firstOrCreate(
            ['user_id' => $company->id],
            [
                'coporate_name' => 'テスト株式会社',
                'coporate_kana' => 'テストカブシキガイシャ',
                'phone_number' => '03-1234-5678',
                'postal_code' => '100-0001',
                'pref' => '東京都',
                'city' => '千代田区',
                'area' => '千代田',
                'street' => '1-1-1',
                'building' => '東京ビル',
                'first_name' => 'テスト',
                'last_name' => '代表',
                'first_kana' => 'テスト',
                'last_kana' => 'ダイヒョウ',
            ]
        );
        
        echo "テストユーザーが作成されました:\n";
        echo "管理者: test.admin@example.com / test123\n";
        echo "一般ユーザー: test.user@example.com / test123\n";
        echo "企業ユーザー: test.company@example.com / test123\n";
    }
}