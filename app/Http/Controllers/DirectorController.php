<?php

namespace App\Http\Controllers;

use App\Models\Director;
use App\Models\Page;
use Inertia\Inertia;

class DirectorController extends Controller
{
    public function index()
    {
        return Inertia::render('Director', [
            'page' => Page::where('slug', 'director')->first(),
            'director' => Director::find(1),
        ]);
    }
}
