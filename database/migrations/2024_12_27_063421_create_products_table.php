<?php

use Faker\Guesser\Name;
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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->on('companies')->constrained()->onDelete('cascade');
            $table->string('name')->nullable();
            $table->string('custom_category')->nullable();
            $table->string('image')->nullable();
            $table->string('image_path')->nullable();
            $table->text('overview')->nullable();
            $table->json('introduction1')->nullable();
            $table->json('introduction2')->nullable();
            $table->string('youtube_url')->nullable();
            $table->json('response_prefs')->nullable();
            $table->json('overseas')->nullable();
            $table->smallInteger('target_type')->default(\App\Enums\TargetType::ALL);
            $table->text('condition')->nullable();
            $table->string('approach')->default(\App\Enums\ProductApproach::getDescription(\App\Enums\ProductApproach::EMAIL));
            $table->text('benefits')->nullable();
            $table->string('capacity_license')->nullable();
            $table->string('capacity_code')->nullable();
            $table->string('product_code')->unique();
            $table->datetime('publish_at')->nullable();
            $table->smallInteger('is_recurit_period')->default(0);
            $table->date('recurit_start')->nullable();
            $table->date('recurit_end')->nullable();
            $table->integer('apply_count')->default(0);
            $table->smallInteger('introduction_type')->default(\App\Enums\TargetType::ALL);
            $table->smallInteger('reward_type')->default(\App\Enums\RewardType::MONEY);
            $table->integer('reward_amount')->nullable()->default(0, 100);
            $table->text('introduction_condition')->nullable();
            $table->text('introduction_memo')->nullable();
            $table->integer('transaction_period')->default(0);
            $table->smallInteger('transaction_period_unit')->default(\App\Enums\PeriodUnit::DAY);
            $table->boolean('is_draft')->default(true)->comment('1: Draft, 0: Not Draft');
            $table->boolean('is_pickup')->default(false)->comment('1: Pickup, 0: Not Pickup');
            $table->smallInteger('status')->default(\App\Enums\ProductStatus::REVIEW);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
