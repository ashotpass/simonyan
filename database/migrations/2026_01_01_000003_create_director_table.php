<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('director', function (Blueprint $table) {
            $table->id();
            $table->string('full_name_hy');
            $table->string('full_name_en');
            $table->string('title_hy')->nullable();
            $table->string('title_en')->nullable();
            $table->longText('bio_hy')->nullable();
            $table->longText('bio_en')->nullable();
            $table->string('photo')->nullable();
            $table->unsignedInteger('years_experience')->default(20);
            $table->text('expertise_hy')->nullable();
            $table->text('expertise_en')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('director');
    }
};
