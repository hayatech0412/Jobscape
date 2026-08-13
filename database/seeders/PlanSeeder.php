<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Plan;

class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Plan::truncate();  // Truncate the plans table

        Plan::create([
            'name' => 'トライアル',
            'label' => 'まずはお試し',
            'amount' => 300,
            'reward_rate' => 30,
            'type' => \App\Enums\PlanType::MONTHLY,
            'options' => json_encode([
                'テキストがはいります',
                'テキストがはいります',
                'テキストがはいります',
                'テキストが入ります。'
            ]),
        ]);
        Plan::create([
            'name' => 'チャレンジ',
            'label' => '気軽に始めるなら',
            'amount' => 3000,
            'reward_rate' => 50,
            'type' => \App\Enums\PlanType::MONTHLY,
            'options' => json_encode([
                'テキストがはいります',
                'テキストがはいります',
                'テキストがはいります',
                'テキストがはいります',
                'テキストが入ります。'
            ]),
        ]);
        Plan::create([
            'name' => 'スタンダード',
            'label' => '本格的に収入を取るなら',
            'amount' => 10000,
            'reward_rate' => 70,
            'type' => \App\Enums\PlanType::MONTHLY,
            'options' => json_encode([
                'テキストがはいります',
                'テキストがはいります',
                'テキストがはいります',
                'テキストがはいります',
                'テキストがはいります',
                'テキストが入ります。'
            ]),
        ]);
        Plan::create([
            'name' => 'スタンダード',
            'label' => '本格的に収入を取るなら',
            'amount' => 10000,
            'reward_rate' => 100,
            'type' => \App\Enums\PlanType::MONTHLY,
            'options' => json_encode([
                'テキストがはいります',
                'テキストがはいります',
                'テキストがはいります',
                'テキストがはいります',
                'テキストがはいります',
                'テキストが入ります。'
            ]),
        ]);
        Plan::create([
            'name' => 'プレミアム',
            'label' => '営業アシスト付き',
            'amount' => 30000,
            'reward_rate' => 100,
            'type' => \App\Enums\PlanType::MONTHLY,
            'options' => json_encode([
                'テキストがはいります',
                'テキストがはいります',
                'テキストがはいります',
                'テキストがはいります',
                'テキストがはいります',
                'テキストがはいります',
                'テキストが入ります。'
            ]),
        ]);

        Plan::create([
            'name' => 'トライアル',
            'label' => 'まずはお試し',
            'amount' => 300 * 12 * 0.9,
            'reward_rate' => 30,
            'type' => \App\Enums\PlanType::YEARLY,
            'options' => json_encode([
                'テキストがはいります',
                'テキストがはいります',
                'テキストがはいります',
                'テキストが入ります。'
            ]),
        ]);
        Plan::create([
            'name' => 'チャレンジ',
            'label' => '気軽に始めるなら',
            'amount' => 3000 * 12 * 0.9,
            'reward_rate' => 50,
            'type' => \App\Enums\PlanType::YEARLY,
            'options' => json_encode([
                'テキストがはいります',
                'テキストがはいります',
                'テキストがはいります',
                'テキストがはいります',
                'テキストが入ります。'
            ]),
        ]);
        Plan::create([
            'name' => 'スタンダード',
            'label' => '本格的に収入を取るなら',
            'amount' => 10000 * 12 * 0.9,
            'reward_rate' => 70,
            'type' => \App\Enums\PlanType::YEARLY,
            'options' => json_encode([
                'テキストがはいります',
                'テキストがはいります',
                'テキストがはいります',
                'テキストがはいります',
                'テキストがはいります',
                'テキストが入ります。'  
            ]),
        ]);
        Plan::create([
            'name' => 'スタンダード',
            'label' => '本格的に収入を取るなら',
            'amount' => 10000 * 12 * 0.9,
            'reward_rate' => 100,
            'type' => \App\Enums\PlanType::YEARLY,
            'options' => json_encode([
                'テキストがはいります',
                'テキストがはいります',
                'テキストがはいります',
                'テキストがはいります',
                'テキストがはいります',
                'テキストが入ります。'  
            ]),
        ]);
        Plan::create([
            'name' => 'プレミアム',
            'label' => '営業アシスト付き',
            'amount' => 30000 * 12 * 0.9,
            'reward_rate' => 100,
            'type' => \App\Enums\PlanType::YEARLY,
            'options' => json_encode([
                'テキストがはいります',
                'テキストがはいります',
                'テキストがはいります',
                'テキストがはいります',
                'テキストがはいります',
                'テキストがはいります',
                'テキストが入ります。'
            ]),
        ]);
    }
}
