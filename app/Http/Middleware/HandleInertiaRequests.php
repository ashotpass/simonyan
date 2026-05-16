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
        $locale = app()->getLocale();

        return [
            ...parent::share($request),
            'locale' => $locale,
            'alt_locale' => $locale === 'hy' ? 'en' : 'hy',
            'settings' => fn () => Setting::map(),
            'recaptchaSiteKey' => fn () => Setting::map()['recaptcha_site_key']['en'] ?? null,
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'csrf' => fn () => csrf_token(),
        ];
    }
}
