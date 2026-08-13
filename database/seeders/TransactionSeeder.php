<?php

namespace Database\Seeders;

use App\Enums\TransactionStatus;
use App\Models\Transaction;
use App\Models\TransactionSchedule;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // SQLite doesn't support SET FOREIGN_KEY_CHECKS
        if (DB::getDriverName() !== 'sqlite') {
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        } else {
            DB::statement('PRAGMA foreign_keys = OFF');
        }
        
        TransactionSchedule::truncate();  // Truncate the plans table
        Transaction::truncate();  // Truncate the plans table
        
        if (DB::getDriverName() !== 'sqlite') {
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        } else {
            DB::statement('PRAGMA foreign_keys = ON');
        }

        Transaction::create([
            'user_id' => '2',
            'product_id' => '17',
            'code' => 'eiskt-222-2345',
            'contact_type' => 1,
            'is_target_agree' => 1,
            'is_encrypt' => 1,
            'user_memo' => '株式会社三沢ファイナンスの三沢社長のご紹介につき、早め・優先的に<br />対応をお願いしますテキストがあります。 <br />・会社名 <br />・部署',
            'target_memo' => '',
            'target_last_name' => 'test',
            'target_first_name' => 'test',
            'target_last_name' => 'test',
            'target_first_name' => 'test',
            'target_email' => 'test@test.com',
            'target_phone_number' => '123456789',
            'target_post_number' => '123456789',
            'target_pref' => 'test',
            'target_city' => 'teststset',
            'target_area' => 'teststset',
            'target_street' => 'testsetst',
            'target_building' => 'teststset',
            'target_company_name' => 'testest',
            'target_position' => 'stestes',
            'contact_with' => 1,
            'status' => TransactionStatus::REQUESTED,
            'total_amount' => 550000,
            'sales_amount' => 500000,
            'fee_amount' => 50000,
            'bill_amount' => 3500,
            'bill_url' => '',
        ]);

        Transaction::create([
            'user_id' => '2',
            'product_id' => '17',
            'code' => 'eiskt-222-2345',
            'contact_type' => 1,
            'is_target_agree' => 1,
            'is_encrypt' => 1,
            'user_memo' => '株式会社三沢ファイナンスの三沢社長のご紹介につき、早め・優先的に\n対応をお願いしますテキストがあります。 ・会社名 ・部署',
            'target_memo' => '',            
            'target_last_name' => 'test',
            'target_first_name' => 'test',
            'target_last_name' => 'test',
            'target_first_name' => 'test',
            'target_email' => 'test@test.com',
            'target_phone_number' => '123456789',
            'target_post_number' => '123456789',
            'target_pref' => 'test',
            'target_city' => 'teststset',
            'target_area' => 'teststset',
            'target_street' => 'testsetst',
            'target_building' => 'teststset',
            'target_company_name' => 'testest',
            'target_position' => 'stestes',
            'contact_with' => 1,
            'status' => TransactionStatus::RESPONDING,
            'total_amount' => 550000,
            'sales_amount' => 500000,
            'fee_amount' => 50000,
            'bill_amount' => 3500,
            'bill_url' => '',
        ]);

        TransactionSchedule::create([
            'transaction_id' => 1,
            'schedule_date' => '2021-09-01 10:00',
            'status' => TransactionStatus::REQUESTED,
            'change_reason' => '',
        ]);
        TransactionSchedule::create([
            'transaction_id' => 2,
            'schedule_date' => '2021-09-01 10:00',
            'status' => TransactionStatus::REQUESTED,
            'change_reason' => '',
        ]);
    }
}
