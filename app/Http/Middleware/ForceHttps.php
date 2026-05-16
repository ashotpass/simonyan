<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;

class ForceHttps
{
    public function handle(Request $request, Closure $next)
    {
        if (app()->environment('production')) {
            URL::forceScheme('https');
            if (! $request->secure() && ! $request->is('up')) {
                return redirect()->secure($request->getRequestUri());
            }
        }
        return $next($request);
    }
}
