<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
Route::group(["prefix" => "v1",], function () {
    //TEST
    Route::get('test', [\App\Http\Controllers\TestController::class,'testPost']);

    //Bootstrap
    Route::get('bootstrap-data', [\App\Http\Controllers\BootstrapController::class,'getBootstrapData']);
    // Auth
    Route::group(["prefix" => "auth",], function () {
        Route::post("register", [\App\Http\Controllers\Auth\RegisterController::class,'register']);
        Route::post("login", [\App\Http\Controllers\Auth\LoginController::class,'login']);
        Route::post("logout",  [\App\Http\Controllers\Auth\LoginController::class,'logout']);

        // FORGOT/RESET PASSWORD
/*        Route::post('password/email', 'SendPasswordResetEmailController@sendResetLinkEmail');
        Route::post('password/reset', 'ResetPasswordController@reset');*/
    });
    // Protected for authenticated users
    Route::group([
        "middleware" => ['auth:api'],
    ], function () {
        Route::post('/authenticate', [\App\Http\Controllers\AuthController::class, "authenticate"]);
    });

    Route::get('/types/{type_slug}/categories', [\App\Http\Controllers\CategoryController::class, 'showCategories']);
    // END authenticated users

});
