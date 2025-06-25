<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('subproblems', function (Blueprint $table) {
            $table->text('hint')->nullable();
            $table->text('expected_output')->nullable();
            $table->json('test_cases')->nullable();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('subproblems', function (Blueprint $table) {
            $table->dropColumn(['hint', 'expected_output', 'test_cases']);
        });
    }
};
