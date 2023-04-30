<?php

namespace App\Exceptions;

use Throwable;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Spatie\Permission\Exceptions\UnauthorizedException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

class ApiExceptionHandler
{
    public function handle(Throwable $e, Request $request): null|\Illuminate\Http\JsonResponse
    {
        if ($request->expectsJson() || $request->is('api/*')) {
            if ($e instanceof UnauthorizedException) {
                return response()->json([
                    'success' => false,
                    'message' => 'You do not have the required permissions.',
                ], 401);
            }

            if ($e instanceof AccessDeniedHttpException) {
                return response()->json([
                    'success' => false,
                    'message' => 'You do not have the required permissions.',
                ], 403);
            }

            if ($e instanceof HttpException) {
                return response()->json([
                    'success' => false,
                    'message' => 'You do not have the required permissions',
                ], $e->getStatusCode());
            }
        }

        return null;
    }
}
