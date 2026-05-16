<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title_hy');
            $table->string('title_en');
            $table->longText('body_hy')->nullable();
            $table->longText('body_en')->nullable();
            $table->string('meta_title_hy')->nullable();
            $table->string('meta_title_en')->nullable();
            $table->string('meta_description_hy', 500)->nullable();
            $table->string('meta_description_en', 500)->nullable();
            $table->string('og_image')->nullable();
            $table->string('icon')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
