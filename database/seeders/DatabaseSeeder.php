<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // SQLite doesn't support SET FOREIGN_KEY_CHECKS
        if (DB::getDriverName() !== 'sqlite') {
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');  // Disable foreign key checks
        } else {
            DB::statement('PRAGMA foreign_keys = OFF');
        }

        $this->call(PlanSeeder::class);
        $this->call(CategorySeeder::class);
        $this->call(UserSeeder::class);
        $this->call(ProductSeeder::class);
        $this->call(MailTemplatesSeeder::class);
        $this->call(VisitHistorySeeder::class);
        $this->call(NoticeSeeder::class);
        $this->call(TransactionSeeder::class);
        $this->call(NotificationSeeder::class);

        if (DB::getDriverName() !== 'sqlite') {
            DB::statement('SET FOREIGN_KEY_CHECKS=1;'); // Enable foreign key checks
        } else {
            DB::statement('PRAGMA foreign_keys = ON');
        }
    }
}
