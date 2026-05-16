<?php

namespace App\Http\Controllers;

use App\Models\Page;
use App\Models\Service;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index()
    {
        return Inertia::render('Services/Index', [
            'page' => Page::where('slug', 'services')->first(),
            'services' => Service::orderBy('sort_order')->get(),
        ]);
    }

    public function show(string $slug)
    {
        $service = Service::where('slug', $slug)->firstOrFail();

        return Inertia::render('Services/Show', [
            'service' => $service,
            'services' => Service::orderBy('sort_order')->get(),
        ]);
    }
}
