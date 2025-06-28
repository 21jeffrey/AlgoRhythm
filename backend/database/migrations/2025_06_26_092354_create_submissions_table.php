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
        Schema::create('submissions', function (Blueprint $table) {
            $table->id();

            // Foreign keys
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('subproblem_id');

            // Submission data
            $table->text('code');
            $table->string('language'); 
            $table->boolean('passed')->default(false); 
            $table->json('output')->nullable(); 
            $table->json('errors')->nullable(); 
            $table->float('execution_time')->nullable(); 
            $table->float('memory')->nullable(); 

            $table->timestamps();

            // Foreign key constraints
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('subproblem_id')->references('id')->on('subproblems')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('submissions');
    }
};
