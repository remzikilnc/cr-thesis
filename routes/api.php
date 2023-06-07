<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'v1', 'middleware' => 'api'], function () {
    // AUTH
    Route::group(["prefix" => "auth",], function () {
        Route::post("register", [\App\Http\Controllers\Auth\RegisterController::class, 'register']);
        Route::post("login", [\App\Http\Controllers\Auth\LoginController::class, 'login'])->name('login');
        Route::post("logout", [\App\Http\Controllers\Auth\LoginController::class, 'logout'])->middleware(['auth:sanctum']);
        /* Route::post('password/email', 'SendPasswordResetEmailController@sendResetLinkEmail');
           Route::post('password/reset', 'ResetPasswordController@reset');
        */
        Route::middleware(['auth:sanctum'])->group(function () {
            Route::get("authenticate", [\App\Http\Controllers\Auth\LoginController::class, 'authenticate'])->name('authenticate');
            Route::get("roles", [\App\Http\Controllers\Auth\RolesController::class, 'getCurrentUserRoles'])->name('getCurrentUserRoles');
        });
    });

    Route::middleware(['optional_auth_sanctum'])->group(function () {
        Route::apiResource("users", \App\Http\Controllers\UserController::class);
        Route::apiResource("products", \App\Http\Controllers\ProductController::class);
        Route::apiResource("categories", \App\Http\Controllers\CategoryController::class);
        //Comments
        Route::resource('products.comments', \App\Http\Controllers\CommentController::class)->only(['index', 'store', 'update', 'destroy']);
    });

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::get("admin/dashboard", [\App\Http\Controllers\DashboardController::class, 'index']);
    });
});
