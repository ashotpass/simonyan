<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DirectorController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\SitemapController;
use Illuminate\Support\Facades\Route;

Route::get('/', fn () => redirect('/hy'));
Route::get('/sitemap.xml', SitemapController::class);

$slugs = [
    'hy' => [
        'about' => 'mer-masin',
        'services' => 'tsarayutyunner',
        'director' => 'tnoren',
        'contact' => 'kap',
    ],
    'en' => [
        'about' => 'about',
        'services' => 'services',
        'director' => 'director',
        'contact' => 'contact',
    ],
];

foreach (['hy', 'en'] as $locale) {
    Route::prefix($locale)->middleware(['setlocale:'.$locale])->name($locale.'.')->group(function () use ($locale, $slugs) {
        Route::get('/', [HomeController::class, 'index'])->name('home');
        Route::get('/'.$slugs[$locale]['about'], [AboutController::class, 'index'])->name('about');
        Route::get('/'.$slugs[$locale]['services'], [ServiceController::class, 'index'])->name('services');
        Route::get('/'.$slugs[$locale]['services'].'/{slug}', [ServiceController::class, 'show'])->name('services.show');
        Route::get('/'.$slugs[$locale]['director'], [DirectorController::class, 'index'])->name('director');
        Route::get('/'.$slugs[$locale]['contact'], [ContactController::class, 'index'])->name('contact');
    });
}
