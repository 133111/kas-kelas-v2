<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('debts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained()->onDelete('cascade');
            $table->foreignId('billing_session_id')->constrained()->onDelete('cascade');
            $table->integer('amount')->default(4000); // 2x lipat
            $table->boolean('is_settled')->default(false);
            $table->unsignedBigInteger('settled_in_session_id')->nullable();
            $table->timestamp('settled_at')->nullable();
            $table->timestamps();

            $table->foreign('settled_in_session_id')->references('id')->on('billing_sessions')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('debts');
    }
};
