<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::truncate();

        Category::create(['name' => 'IT・AI・通信関係']);
        Category::create(['name' => 'Web制作']);
        Category::create(['name' => '美容・健康・化粧品']);
        Category::create(['name' => 'エンターテイメント']);
        Category::create(['name' => 'エコ・省エネ']);
        Category::create(['name' => '不動産']);
        Category::create(['name' => '食品・飲食']);
        Category::create(['name' => 'ペット']);
        Category::create(['name' => '子育て・教育']);
        Category::create(['name' => 'コンサルチング']);
    }
}
