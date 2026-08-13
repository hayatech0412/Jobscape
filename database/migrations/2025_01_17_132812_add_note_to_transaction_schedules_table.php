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
        Schema::table('transaction_schedules', function (Blueprint $table) {
            $table->tinyInteger('canceled_reason')->nullable()->after('change_reason');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('transaction_schedules', function (Blueprint $table) {
            $table->dropColumn('canceled_reason');
        });
    }
};
