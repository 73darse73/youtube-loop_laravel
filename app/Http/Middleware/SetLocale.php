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
        $supported = ['ja', 'en', 'es', 'ko', 'pt', 'zh-TW'];
        $locale = $request->header('X-Locale', 'ja');

        if (in_array($locale, $supported)) {
            app()->setLocale($locale);
        }

        return $next($request);
    }
}
