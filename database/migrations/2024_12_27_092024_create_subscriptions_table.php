<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('subscriptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('plan_id')->constrained()->onDelete('cascade');
            $table->string('plan_type')->comment('Plan type: monthly, yearly');
            $table->string('gmo_access_id')->nullable()->comment('GMO Payment Gateway Access ID');
            $table->string('gmo_access_pass')->nullable()->comment('GMO Payment Gateway Access Pass');
            $table->string('gmo_order_id')->nullable()->comment('GMO Payment Gateway Order ID');
            $table->decimal('amount', 10, 2)->comment('Subscription amount');
            $table->decimal('tax', 10, 2)->comment('Tax amount');
            $table->string('status')->default('active')->comment('Subscription status: active, cancelled, expired');
            $table->timestamp('subscribed_at')->nullable();
            $table->timestamp('cancelled_at')->nullable();
            $table->timestamp('expired_at')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('subscriptions');
    }
}; 