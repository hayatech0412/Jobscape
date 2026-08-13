<?php

namespace Database\Seeders;

use App\Models\VisitHistory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VisitHistorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        VisitHistory::truncate();
        VisitHistory::factory(30)->create();
    }
}
