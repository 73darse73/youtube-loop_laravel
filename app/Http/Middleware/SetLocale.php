<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $localeMap = ['zh-TW' => 'zh_TW'];

        if ($request->hasHeader('X-Locale')) {
            $locale = $request->header('X-Locale');
        } else {
            $preferred = $request->getPreferredLanguage(['ja', 'en']);
            $locale = $preferred ?? 'ja';
        }

        $locale = $localeMap[$locale] ?? $locale;
        $hasLangFile = is_dir(lang_path($locale));

        app()->setLocale($hasLangFile ? $locale : 'en');

        return $next($request);
    }
}
