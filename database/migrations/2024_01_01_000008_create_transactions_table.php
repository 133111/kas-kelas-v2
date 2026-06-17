<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->string('type'); // income, expense
            $table->integer('amount');
            $table->string('description');
            $table->string('category')->default('kas'); // kas, pengeluaran, hutang_lunas, lainnya
            $table->unsignedBigInteger('billing_session_id')->nullable();
            $table->date('transaction_date');
            $table->timestamps();

            $table->foreign('billing_session_id')->references('id')->on('billing_sessions')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
