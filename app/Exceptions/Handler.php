<?php

namespace App\Exceptions;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Validation\UnauthorizedException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
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

        $this->renderable(function (AuthenticationException $e, $request) {
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

        $this->renderable(function (AuthorizationException $e, $request) {
            return response()->json([
                'success' => false,
                'message' => 'Access Denied.',
            ], 403);
        });

        $this->renderable(function (NotFoundHttpException  $e, $request) {
            return response()->json([
                'success' => false,
                'message' => 'Not Found!'
            ], 404);
        });

        $this->renderable(function (ModelNotFoundException  $e, $request) {
            return response()->json([
                'success' => false,
                'message' => 'Not Found!'
            ], 404);
        });
    }
}
