<?php

namespace App\Http\Controllers;

use App\Models\Director;
use App\Models\Page;
use Inertia\Inertia;

class AboutController extends Controller
{
    public function index()
    {
        return Inertia::render('About', [
            'page' => Page::where('slug', 'about')->first(),
            'director' => Director::find(1),
        ]);
    }
}
