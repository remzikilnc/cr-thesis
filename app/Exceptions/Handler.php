<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Validation\UnauthorizedException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->renderable(function (\Spatie\Permission\Exceptions\UnauthorizedException $e, $request) {
            return response()->json([
                'success' => false,
                'message' => 'You do not have the required permissions.',
            ], 403);
        });

        $this->renderable(function (\Illuminate\Auth\AuthenticationException $e, $request){
            return response()->json([
                'success' => false,
                'message' => 'Access Denied.',
            ], 401);
        });

        $this->renderable(function (AccessDeniedHttpException $e, $request) {
            return response()->json([
                'success' => false,
                'message' => 'Access Denied.',
            ], 403);
        });

        $this->renderable(function (\Illuminate\Auth\Access\AuthorizationException $e, $request) {
            return response()->json([
                'success' => false,
                'message' => 'Access Denied.',
            ], 403);
        });
    }
}
