<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends BaseController
{
    public function index(Request $request)
    {
        return response()->ok($request->user());
    }
}
