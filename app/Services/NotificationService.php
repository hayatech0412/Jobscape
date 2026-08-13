<?php

namespace App\Services;

use App\Models\User;
use App\Models\Notification;
use App\Enums\TransactionStatus;
use App\Models\Transaction;
use App\Models\TransactionSchedule;
use App\Enums\NoResponseReason;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Jobs\SendEmailJob;
use App\Notifications\EmailNotification;

class NotificationService
{
    public function sendEmail($email, $slug, $data)
    {
        try {
            SendEmailJob::dispatch($email, new EmailNotification($email, $slug, $data));
        } catch (\Throwable $e) {
            Log::error($e->getMessage());
        }
    }

    // Type1 : 取引スタート
    public function sendTransactionStartNotification(Transaction $transaction)
    {
        try {
            DB::beginTransaction();

            $data = [
                'url_order_show' => route('company.orders.show', [$transaction->id]),
                'user_name' => $transaction->user->profile->full_name,
                'product_name' => $transaction->product->name,
            ];

            $this->sendEmail($transaction->product->company->user->email, 'company.orders.start', $data);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    // Type2 : 取引完了予定日更新
    public function sendTransactionProposeUpdateNotification($sourceUser, Transaction $transaction)
    {
        try {
            DB::beginTransaction();

            $notification = Notification::create([
                'source_id' => $sourceUser->id,
                'target_id' => $transaction->user->id,
                'product_id' => $transaction->product->id,
                'title' => '取引完了予定日の更新',
                'content' => '商材<a href="' . route('transaction', [$transaction->id]) . '" style="text-decoration: underline;">「'
                                . $transaction->product->name
                                . '」</a>の取引完了予定日が更新されました。',
            ]);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
        return $notification;
    }

    // Type3 : 取引完了予定日更新
    public function sendTransactionResponseNotification($sourceUser, Transaction $transaction)
    {
        try {
            DB::beginTransaction();

            $content = '商材<a href="' . route('transaction', [$transaction->id]) . '" style="text-decoration: underline;">「'
                                . $transaction->product->name
                                . ($transaction->status == TransactionStatus::RESPONDING ? '」</a>の取引商談を開始しました。' : '」</a>の取引商談を開始できませんでした。');
            if ($transaction->status == TransactionStatus::REQUESTED) {
                $content = $content . '<br><br>商談を開始できない理由:<br>'
                                    . NoResponseReason::getLabel($transaction->not_complete_reason)
                                    . '<br>'
                                    . $transaction->schedules()->where('status', TransactionStatus::REQUESTED)->first()->change_reason;
            }

            $title = $transaction->status == TransactionStatus::RESPONDING ? '商談の開始' : '商談不可';

            $notification = Notification::create([
                'source_id' => $sourceUser->id,
                'target_id' => $transaction->user->id,
                'product_id' => $transaction->product->id,
                'title' => $title,
                'content' => $content,
            ]);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
        return $notification;
    }

    // Type4 : 商談結果報告（成功）
    public function sendTransactionSuccessNotification($sourceUser, Transaction $transaction)
    {
        try {
            DB::beginTransaction();

            $notification = Notification::create([
                'source_id' => $sourceUser->id,
                'target_id' => $transaction->user->id,
                'product_id' => $transaction->product->id,
                'title' => '商談結果報告',
                'content' => '商材<a href="' . route('transaction', [$transaction->id]) . '" style="text-decoration: underline;">「'
                                . $transaction->product->name
                                . '」</a>の取引が成立されました。',
            ]);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
        return $notification;
    }

    // Type5 : 商談結果報告（失注）
    public function sendTransactionFailNotification($sourceUser, Transaction $transaction)
    {
        try {
            DB::beginTransaction();

            $notification = Notification::create([
                'source_id' => $sourceUser->id,
                'target_id' => $transaction->user->id,
                'product_id' => $transaction->product->id,
                'title' => '商談結果報告',
                'content' => '商材<a href="' . route('transaction', [$transaction->id]) . '" style="text-decoration: underline;">「'
                                . $transaction->product->name
                                . '」</a>の取引が失注されました。',
            ]);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
        return $notification;
    }

    // Type6 : 支払い報告
    public function sendTransactionPayedNotification($sourceUser, Transaction $transaction)
    {
        try {
            DB::beginTransaction();

            $notification = Notification::create([
                'source_id' => $sourceUser->id,
                'target_id' => $transaction->user->id,
                'product_id' => $transaction->product->id,
                'title' => '支払い報告',
                'content' => '商材<a href="' . route('transaction', [$transaction->id]) . '" style="text-decoration: underline;">「'
                                . $transaction->product->name
                                . '」</a>の支払いが完了しました。',
            ]);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
        return $notification;
    }
}
