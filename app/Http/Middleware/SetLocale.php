<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class SetLocale
{
    public function handle(Request $request, Closure $next, string $locale = 'hy')
    {
        $locale = in_array($locale, ['hy', 'en']) ? $locale : 'hy';
        App::setLocale($locale);
        return $next($request);
    }
}
