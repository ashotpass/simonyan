<?php

namespace App\Http\Controllers;

use App\Models\Page;
use App\Models\Service;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render('Home', [
            'page' => Page::where('slug', 'home')->first(),
            'services' => Service::orderBy('sort_order')->get(),
        ]);
    }
}
