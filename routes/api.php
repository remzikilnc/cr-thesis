<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
Route::group(['prefix' => 'v1', 'middleware' => 'api'], function () {
    //TEST

    //Bootstrap
    // Auth
    Route::group(["prefix" => "auth",], function () {
        Route::post("register", [\App\Http\Controllers\Auth\RegisterController::class,'register']);
        Route::post("login", [\App\Http\Controllers\Auth\LoginController::class,'login'])->name('login');
        Route::post("logout",  [\App\Http\Controllers\Auth\LoginController::class,'logout']);

        Route::middleware(['auth:sanctum'])->group(function () {
            Route::get("authenticate", [\App\Http\Controllers\Auth\LoginController::class,'authenticate'])->name('authenticate');
            Route::get("roles", [\App\Http\Controllers\Auth\RolesController::class,'getCurrentUserRoles'])->name('getCurrentUserRoles');
        });

        // FORGOT/RESET PASSWORD
/*        Route::post('password/email', 'SendPasswordResetEmailController@sendResetLinkEmail');
        Route::post('password/reset', 'ResetPasswordController@reset');*/
    });

    Route::middleware(['auth:sanctum', 'role:admin,api'])->group(function () {
        Route::get("test", [\App\Http\Controllers\TestController::class,'testGet']);
        Route::post("test", [\App\Http\Controllers\TestController::class,'testPost']);
    });

    // Protected for authenticated users
    Route::group([
        "middleware" => ['auth:api'],
    ], function () {
     /*   Route::post('/authenticate', [\App\Http\Controllers\AuthController::class, "authenticate"]);*/
    });

/*    Route::get('/types/{type_slug}/categories', [\App\Http\Controllers\CategoryController::class, 'showCategories']);*/
    // END authenticated users

});
