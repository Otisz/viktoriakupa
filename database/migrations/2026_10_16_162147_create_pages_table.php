<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pages', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->longText('content');
            $table->timestamps();
        });

        DB::table('pages')->insert([
            ['id' => Str::uuid7(), 'title' => 'Rólunk', 'slug' => 'rolunk', 'content' => '', 'created_at' => now(), 'updated_at' => now()],
            ['id' => Str::uuid7(), 'title' => 'Versenynaptár', 'slug' => 'versenynaptar', 'content' => '', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pages');
    }
};
