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
         DB::statement("ALTER TABLE challenges MODIFY difficulty ENUM('beginner', 'intermediate', 'advanced') NOT NULL");;
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
       DB::statement("ALTER TABLE challenges MODIFY difficulty ENUM('easy', 'intermediate', 'advanced') NOT NULL");
    }
};
