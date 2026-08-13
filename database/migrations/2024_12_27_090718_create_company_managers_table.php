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
        Schema::create('company_managers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained('companies')->onDelete('cascade');
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('first_kana')->nullable();
            $table->string('last_kana')->nullable();
            $table->string('phone_number')->nullable();
            $table->string('email')->nullable();
            $table->string('card_front')->nullable();
            $table->string('card_front_path')->nullable();
            $table->string('card_back')->nullable();
            $table->string('card_back_path')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('company_managers');
    }
};
