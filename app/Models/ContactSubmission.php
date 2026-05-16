<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactSubmission extends Model
{
    public $timestamps = false;
    protected $guarded = [];
    protected $casts = [
        'is_read' => 'boolean',
        'created_at' => 'datetime',
    ];
}
