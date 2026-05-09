<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    private const ADMIN_EMAILS = [
        '73darse73@gmail.com',
    ];

    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->user() || !in_array($request->user()->email, self::ADMIN_EMAILS)) {
            abort(403);
        }

        return $next($request);
    }
}
