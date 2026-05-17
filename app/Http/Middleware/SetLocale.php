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
        $locale = $request->header('X-Locale', 'ja');
        $hasLangFile = is_dir(lang_path($locale));

        app()->setLocale($hasLangFile ? $locale : 'en');

        return $next($request);
    }
}
