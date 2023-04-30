<?php namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Request;

class TestController extends BaseController
{

    /*200|6HyYmOTr0UMSat6GHp4H1KCs1TURta1bOgyLjBGF*/

    public function __construct(\Illuminate\Http\Request $request)
    {
        $this->request = $request;
    }

    public function testGet(): \Illuminate\Http\JsonResponse
    {
        return response()->json('TestGet', 200);
    }

    public function testPost(): \Illuminate\Http\JsonResponse
    {
        return response()->json('TestPost', 200);
    }

    public function testPostAuth(Request $request, User $user): \Illuminate\Http\JsonResponse
    {
        $this->auth('show');
        return $this->success([
            'user' => $request->user(),
            'ürün' => 'ürün'
        ]);

    }

}
