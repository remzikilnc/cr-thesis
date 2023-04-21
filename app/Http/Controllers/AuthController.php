<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Common\Core\BaseController;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use function Symfony\Component\Translation\t;

class AuthController extends BaseController
{

    //Todo tekrar yapılandır
    public function register(Request $request): JsonResponse
    {

        $user = new User([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);
        $user = $user->save();

        $credentials = [
            'email' => $request->email,
            'password' => $request->password
        ];

        if (!Auth::attempt($credentials)) {
            return response()->json([
                'success' => false,
                'message' => 'Giriş yapılamadı, bilgileri kontrol edin ve tekrar deneyin',
                'data' => []
            ], 401);
        }
        //Token
        return $this->getUser($request);
    }

    public function login(Request $request): JsonResponse
    {
        $credentials = $request->only(['email', 'password']);

        if (!Auth::attempt($credentials)) {
            return $this->error('Giriş yapılamadı, bilgileri kontrol edin ve tekrar deneyin', [], 401);
        } else {
            return $this->getUser($request);
        }

    }

    public function logout(Request $request): JsonResponse
    {
        $user = $request->user();
        $accessToken = $user->token();

        if ($accessToken) {
            $accessToken->revoke();
            return $this->success([],200);
        } else {
            return $this->error('Çıkış başarısız, bir hata oluştu',[],422);
        }
    }

    public function authenticate(Request $request): JsonResponse
    {
        $user = [];
        if (Auth::check()) {
            $user = $request->user();
        }
        return response()->json([
            'user' => $user,
            'isLoggedIn' => Auth::check()
        ], 200);
    }

    public function getUser(Request $request): JsonResponse
    {
        $user = $request->user();
        $tokenResult = $user->createToken('Personal Access');
        $token = $tokenResult->token;

        if ($request->remember) {
            $token->expires_at = Carbon::now()->addWeeks();
        }

        $token->save();

        $data = [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ],
            'token' => [
                'access_token' => $tokenResult->accessToken,
                'token_type' => 'Bearer',
                'expires_at' => Carbon::parse($token->expires_at)->toDateTimeString(),
            ],
        ];
        return $this->success($data, 200);
    }

}
