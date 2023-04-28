<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\Events\TokenAuthenticated;
use Symfony\Component\HttpFoundation\Response;

class OptionalAuthSanctum
{
    /**
     * Handle an incoming request.
     *
     * @param \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response) $next
     * @throws \Exception
     */
    public function handle(Request $request, Closure $next)
    {
        if ($request->bearerToken()) {
            Auth::shouldUse('sanctum');
            return app('App\Http\Middleware\SanctumAuthenticate')->handle($request, $next);
        }

        return $next($request);
    }
}
