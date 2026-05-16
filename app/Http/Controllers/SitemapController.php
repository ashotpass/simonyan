<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function __invoke(): Response
    {
        $base = config('app.url');
        $urls = [];

        $paths = [
            'hy' => ['', 'mer-masin', 'tsarayutyunner', 'tnoren', 'kap'],
            'en' => ['', 'about', 'services', 'director', 'contact'],
        ];
        foreach ($paths as $locale => $list) {
            foreach ($list as $p) {
                $urls[] = rtrim($base, '/').'/'.$locale.($p ? '/'.$p : '');
            }
        }
        foreach (Service::all() as $s) {
            $urls[] = rtrim($base, '/').'/hy/tsarayutyunner/'.$s->slug;
            $urls[] = rtrim($base, '/').'/en/services/'.$s->slug;
        }

        $xml = '<?xml version="1.0" encoding="UTF-8"?>'."\n";
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'."\n";
        foreach ($urls as $u) {
            $xml .= '  <url><loc>'.htmlspecialchars($u).'</loc></url>'."\n";
        }
        $xml .= '</urlset>'."\n";

        return response($xml, 200, ['Content-Type' => 'application/xml']);
    }
}
