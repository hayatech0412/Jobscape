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
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('plan_id')->nullable()->constrained()->onDelete('cascade');
            $table->bigInteger('payment_method_id')->nullable();
            $table->string('phone_number')->nullable();
            $table->string('sms_verify_code')->nullable();
            $table->datetime('sms_verified_at')->nullable();
            $table->timestamp('sms_verify_code_expire_at')->nullable();
            $table->smallInteger('user_type')->default(\App\Enums\UserType::PERSON);
            $table->string('nickname')->nullable();
            $table->text('appeal_statement')->nullable();
            $table->longText('introduction')->nullable();
            $table->string('extra_email')->nullable();
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('first_kana')->nullable();
            $table->string('last_kana')->nullable();
            $table->string('post_number')->nullable();
            $table->string('pref')->nullable();
            $table->string('city')->nullable();
            $table->string('area')->nullable();
            $table->string('street')->nullable();
            $table->string('building')->nullable();
            $table->date('birthday')->nullable();
            $table->smallInteger('gender')->default(\App\Enums\Gender::NO_ANSWER);
            $table->json('prefectures')->nullable();
            $table->string('vite_code')->nullable();
            $table->smallInteger('step')->default(1);
            $table->smallInteger('is_trial')->default(0);
            $table->datetime('trial_end_at')->nullable();
            $table->boolean('is_notify')->default(false)->comment('true: Notify, false: Not Notify');
            $table->string('business_company_name')->nullable();
            $table->string('business_name')->nullable();
            $table->string('business_kana')->nullable();
            $table->string('business_number')->nullable();
            $table->string('business_post_number')->nullable();
            $table->string('business_pref')->nullable();
            $table->string('business_city')->nullable();
            $table->string('business_area')->nullable();
            $table->string('business_street')->nullable();
            $table->string('business_building')->nullable();
            $table->string('business_phone_number')->nullable();
            $table->string('business_invoice_number')->nullable();
            $table->string('business_master_first_name')->nullable();
            $table->string('business_master_last_name')->nullable();
            $table->string('business_master_first_kana')->nullable();
            $table->string('business_master_last_kana')->nullable();
            $table->string('country')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
