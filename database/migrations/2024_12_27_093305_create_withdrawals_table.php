<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('withdrawals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null');
            $table->datetime('withdraw_at')->nullable();
            $table->integer('amount')->default(0);
            $table->integer('request_amount')->default(0);
            $table->integer('amount_fee')->default(0);
            // $table->smallInteger('is_emegency')->default(\App\Enums\Emergency::NOTEMERGENCY)->comment('0: not emegency, 1: read');
            $table->string('bank_name')->nullable();
            $table->string('account_type')->nullable();
            $table->string('account_code')->nullable();
            $table->string('shop_code')->nullable();
            $table->string('account_last_name')->nullable();
            $table->string('account_first_name')->nullable();
            $table->smallInteger('status')->default(\App\Enums\WithDrawalStatus::REQUESTED);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('withdrawals');
    }
};
