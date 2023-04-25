<?php namespace App\Http\Controllers;
use App\Models\User;
use App\Services\Settings;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class TestController extends BaseController {



    public function testGet(): \Illuminate\Http\JsonResponse
    {
        return response()->json('TestGet',200);
    }
    public function testPost(): \Illuminate\Http\JsonResponse
    {
        return response()->json('TestPost',200);
    }
    public function testPostAuth(Request $request): \Illuminate\Http\JsonResponse
    {
        return response()->json('t',200);
    }

}
