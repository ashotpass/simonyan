<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::dropIfExists('contact_submissions');

        if (Schema::hasTable('settings')) {
            DB::table('settings')
                ->whereIn('key', ['recaptcha_site_key', 'recaptcha_secret_key', 'email_recipient'])
                ->delete();
        }
    }

    public function down(): void
    {
        // Intentionally non-reversible — the contact form has been removed.
    }
};
