<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Setting extends Model
{
    protected $guarded = [];

    public static function map(): array
    {
        return Cache::remember('settings.map', 60, function () {
            return self::all()->mapWithKeys(fn ($r) => [
                $r->key => ['hy' => $r->value_hy, 'en' => $r->value_en],
            ])->toArray();
        });
    }

    protected static function booted(): void
    {
        static::saved(fn () => Cache::forget('settings.map'));
        static::deleted(fn () => Cache::forget('settings.map'));
    }
}
