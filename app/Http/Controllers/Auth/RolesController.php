<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\BaseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;

class RolesController extends BaseController
{
    public function getCurrentUserRoles(Request $request){
        if ($request->bearerToken()) {
            return response()->ok(Auth::guard()->user()->getRoleNamesAttribute());
        }
        return response()->badRequests();
    }
}
