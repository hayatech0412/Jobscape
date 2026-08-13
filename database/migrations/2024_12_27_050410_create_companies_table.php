<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use function Laravel\Prompts\table;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->smallInteger('regist_step')->default(0);
            $table->string('coporate_code')->nullable();
            $table->string('nickname')->nullable();
            $table->string('coporate_name')->nullable();
            $table->string('coporate_kana')->nullable();
            $table->string('postal_code')->nullable();
            $table->string('pref')->nullable();
            $table->string('city')->nullable();
            $table->string('area')->nullable();
            $table->string('street')->nullable();
            $table->string('building')->nullable();
            $table->string('pref_kana')->nullable();
            $table->string('city_kana')->nullable();
            $table->string('area_kana')->nullable();
            $table->string('street_kana')->nullable();
            $table->string('building_kana')->nullable();
            $table->string('phone_number')->nullable();
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('first_kana')->nullable();
            $table->string('last_kana')->nullable();
            $table->string('site_url')->nullable();
            $table->string('pamphlet')->nullable();
            $table->string('pamphlet_path')->nullable();
            $table->smallInteger('operator_type')->default(\App\Enums\OperatorType::NO);
            $table->string('invoice_number')->nullable();
            $table->smallInteger('office_type')->default(\App\Enums\OfficeType::COMPANY);
            $table->smallInteger('business_type')->default(\App\Enums\BusinessType::CORPORATION);
            $table->string('office_name')->nullable();
            $table->string('office_name_kana')->nullable();
            $table->string('office_postal_code')->nullable();
            $table->string('office_pref')->nullable();
            $table->string('office_city')->nullable();
            $table->string('office_area')->nullable();
            $table->string('office_street')->nullable();
            $table->string('office_building')->nullable();
            $table->string('office_phone_number')->nullable();
            $table->string('office_master_first_name')->nullable();
            $table->string('office_master_last_name')->nullable();
            $table->string('office_master_first_kana')->nullable();
            $table->string('office_master_last_kana')->nullable();
            $table->smallInteger('employee_count')->nullable();
            $table->smallInteger('earning_amount')->nullable();
            $table->foreignId('category_id')->nullable()->constrained('categories')->onDelete('cascade');
            $table->text('overview')->nullable();
            $table->text('summary')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
