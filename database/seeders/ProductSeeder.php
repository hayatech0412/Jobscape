<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\ProductSchedule;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
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
        
        ProductSchedule::truncate();
        Product::truncate();
        
        if (DB::getDriverName() !== 'sqlite') {
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        } else {
            DB::statement('PRAGMA foreign_keys = ON');
        }

        Product::factory(20)->create();

        ProductSchedule::create([
            'product_id' => 1,
            'order' => 1,
            'start_amount' => '1',
            'start_unit' => '日',
            'end_amount' => '1',
            'end_unit' => '日',
            'title' => '紹介された方へお電話'
        ]);

        ProductSchedule::create([
            'product_id' => 1,
            'order' => 2,
            'start_amount' => '1',
            'start_unit' => '日',
            'end_amount' => '1',
            'end_unit' => '日',
            'title' => '紹介された方へお電話'
        ]);

        ProductSchedule::create([
            'product_id' => 1,
            'order' => 3,
            'start_amount' => '1',
            'start_unit' => '日',
            'end_amount' => '1',
            'end_unit' => '日',
            'title' => '紹介された方へお電話'
        ]);
    }
}
