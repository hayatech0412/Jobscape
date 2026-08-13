<?php

namespace App\Console\Commands;

use App\Enums\TransactionStatus;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;
use App\Models\Withholding;
use App\Models\User;
use App\Models\Transaction;

class CalculateWithholdingTax extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:calculate-withholding-tax';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = '月12万円以上稼いだユーザーの源泉徴収税を計算し、支払う';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $startOfMonth = Carbon::now()->subMonth()->startOfMonth();
        $endOfMonth = Carbon::now()->subMonth()->endOfMonth();
        $withholdingRate = config('values.withholding_rate', 10.21); // デフォルト10.21%

        // 12万円以上稼いだユーザーを取得
        $eligibleUserIds = Transaction::whereBetween('completed_at', [$startOfMonth, $endOfMonth])
            ->where('status', TransactionStatus::COMPLETE)
            ->groupBy('user_id')
            ->havingRaw('SUM(total_amount) >= 0') // 12万円以上
            ->pluck('user_id'); // ユーザーIDのリストを取得

        // 対象ユーザーの処理
        $users = User::whereIn('id', $eligibleUserIds)->get();

        foreach ($users as $user) {
            $totalEarnings = $user->transactions()
                ->whereBetween('completed_at', [$startOfMonth, $endOfMonth])
                ->where('status', TransactionStatus::COMPLETE)
                ->sum('total_amount');

            $taxAmount = $totalEarnings * ($withholdingRate / 100);

            // `withholdings` テーブルに保存
            Withholding::updateOrCreate(
                [
                    'user_id' => $user->id,
                    'tax_period' => $startOfMonth->toDateString()
                ],
                [
                    'total_earnings' => $totalEarnings,
                    'tax_amount' => $taxAmount,
                    'is_paid' => false, // 初期状態は未払い
                ]
            );

            Log::info("User {$user->id} の源泉徴収税 {$taxAmount} 円を保存しました。");
        }

        $this->info('源泉徴収税の計算と保存が完了しました。');
    }
}
