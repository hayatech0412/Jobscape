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
        Schema::create('withholdings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade'); // ユーザーID（外部キー）
            $table->decimal('total_earnings', 18, 2)->nullable(); // 売上合計
            $table->decimal('tax_amount', 18, 2)->nullable(); // 源泉徴収税額
            $table->date('tax_period')->nullable(); // 課税対象期間（例: 2025-01-01）
            $table->integer('is_paid')->default(0)->comment('0: Not Paid, 1: Paid'); // 支払い状況
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('withholdings');
    }
};
