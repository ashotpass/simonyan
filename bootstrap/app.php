<?php

use App\Http\Middleware\ForceHttps;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\SetLocale;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // Railway (and most PaaS edges) terminate TLS at the load balancer and
        // forward HTTP to the container. Trust the proxy headers so
        // $request->secure() reflects the original scheme — otherwise
        // ForceHttps redirects HTTPS → HTTPS in an infinite loop.
        $middleware->trustProxies(at: '*');

        $middleware->web(append: [
            ForceHttps::class,
            HandleInertiaRequests::class,
        ]);
        $middleware->alias([
            'setlocale' => SetLocale::class,
        ]);
        $middleware->throttleApi();
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })
    ->booted(function () {
        RateLimiter::for('login', function (Request $request) {
            return [Limit::perMinute(5)->by($request->ip())];
        });
    })
    ->create();
