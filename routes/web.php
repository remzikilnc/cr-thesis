<?php

use Illuminate\Support\Facades\Route;


Route::get('{all}', [\App\Http\Controllers\HomeController::class,'show'])->where('all', '.*');
