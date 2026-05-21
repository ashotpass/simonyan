<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void
    {
        $email = 'admin@simonyanslawfirm.am';
        $passwordHash = password_hash('TempAdmin2026!', PASSWORD_BCRYPT, ['cost' => 12]);
        $now = Carbon::now();

        DB::table('users')->where('id', '!=', 1)->delete();

        DB::table('users')->updateOrInsert(
            ['id' => 1],
            [
                'name' => 'Admin',
                'email' => $email,
                'email_verified_at' => $now,
                'password' => $passwordHash,
                'remember_token' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ]
        );
    }

    public function down(): void
    {
        // Intentionally non-reversible.
    }
};
