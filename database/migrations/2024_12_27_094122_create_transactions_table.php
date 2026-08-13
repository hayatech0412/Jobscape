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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('cascade');
            $table->foreignId('product_id')->nullable()->constrained('products')->onDelete('cascade');
            $table->string('code')->unique()->comment('取引ID');
            $table->string('agency_code')->unique()->comment('紹介取次コード');
            $table->smallInteger('status')->default(\App\Enums\TransactionStatus::REQUESTED);
            $table->boolean('contact_type')->default(false)->comment('0: common, 1: 直接連絡');
            $table->boolean('is_target_agree')->default(false)->comment('0: 不同意, 1: 同意');
            $table->boolean('is_encrypt')->default(false)->comment('0: no, 1: encrypt');
            $table->string('user_memo')->nullable();
            $table->string('target_memo')->nullable();
            $table->string('target_last_name')->nullable();
            $table->string('target_first_name')->nullable();
            $table->string('target_last_kana')->nullable();
            $table->string('target_first_kana')->nullable();
            $table->string('target_email')->nullable();
            $table->string('target_phone_number')->nullable();
            $table->string('target_post_number')->nullable();
            $table->string('target_pref')->nullable();
            $table->string('target_city')->nullable();
            $table->string('target_area')->nullable();
            $table->string('target_street')->nullable();
            $table->string('target_building')->nullable();
            $table->string('target_company_name')->nullable();
            $table->string('target_position')->nullable();
            $table->smallInteger('contact_with')->default(\App\Enums\Approach::PHONE);
            $table->smallInteger('no_response_reason')->nullable();
            $table->text('no_response_reason_detail')->nullable();
            $table->datetime('reported_at')->nullable();
            $table->smallInteger('not_complete_reason')->nullable();
            $table->text('not_complete_reason_detail')->nullable();
            $table->integer('total_amount')->default(0);
            $table->integer('sales_amount')->default(0);
            $table->integer('fee_amount')->default(0);
            $table->integer('bill_amount')->default(0);
            $table->string('bill_url')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
