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
        Schema::create('leaderboard_learner', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('learner_id');
            $table->integer('score')->default(0);
            $table->integer('rank')->nullable();
            $table->timestamp('updated_at')->useCurrent()->nullable();

            $table->foreign('learner_id')->references('id')->on('users')->onDelete('cascade');
            $table->unique('learner_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leaderboard_learner');
    }
};
