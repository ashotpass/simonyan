<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        return Inertia::render('Contact', [
            'page' => Page::where('slug', 'contact')->first(),
        ]);
    }
}
