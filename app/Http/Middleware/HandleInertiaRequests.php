<?php

namespace App\Http\Middleware;

use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        // Resolve locale lazily: Inertia's parent middleware calls share()
        // BEFORE $next($request), so the SetLocale route middleware hasn't
        // run yet. Evaluating app()->getLocale() at this point would always
        // return the default APP_LOCALE, even on /en URLs. Wrapping in
        // closures defers evaluation until Inertia serializes the response,
        // by which time SetLocale has set the correct locale.
        return [
            ...parent::share($request),
            'locale' => fn () => app()->getLocale(),
            'alt_locale' => fn () => app()->getLocale() === 'hy' ? 'en' : 'hy',
            'settings' => fn () => Setting::map(),
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'csrf' => fn () => csrf_token(),
        ];
    }
}
