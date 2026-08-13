<?php

namespace App\Console\Commands;


use Illuminate\Console\Command;
use App\Models\Withholding;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class PayWithholdingTax extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:pay-withholding-tax';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = '未払いの源泉徴収税を支払う';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $unpaidTaxes = Withholding::where('is_paid', 0)->get();

        foreach ($unpaidTaxes as $tax) {
            // 支払い処理（仮）
            $this->payTax($tax);

            // `is_paid` を更新
            $tax->update(['is_paid' => 1]);

            Log::info("User {$tax->user_id} の源泉徴収税 {$tax->tax_amount} 円を支払いました。");
        }

        $this->info('未払いの源泉徴収税を支払いました。');
    }

    private function payTax($tax)
    {
        // 実際の支払い処理（API連携など）
        Log::info("User {$tax->user_id} の税金支払い処理実行");
    }
}
