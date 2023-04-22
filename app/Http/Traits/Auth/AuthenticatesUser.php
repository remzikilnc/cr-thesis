<?php

namespace App\Http\Traits\Auth;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Contracts\Auth\StatefulGuard;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

trait AuthenticatesUser
{
    public function login(Request $request): JsonResponse
    {
        $validationResult = $this->validateLogin($request);
        if ($validationResult !== true) {
            return $validationResult;
        }
        if ($this->attemptLogin($request)) {
            $token = $this->createToken($request);
            return $this->sendLoginResponse($request, $token);
        }
        return $this->sendFailedLoginResponse();
    }

    protected function validateLogin(Request $request): JsonResponse|bool
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|max:128|email:rfc',
            'password' => 'required|max:32|string|min:6',
            'remember' => 'boolean',
        ], [
            'email.required' => 'E-posta adresi gereklidir.',
            'email.string' => 'E-posta adresi geçerli bir metin olmalıdır.',
            'email.max' => 'E-posta adresi en fazla 128 karakter olmalıdır.',
            'email.email' => 'E-posta adresi geçerli bir e-posta formatında olmalıdır.',

            'password.required' => 'Şifre gereklidir.',
            'password.max' => 'Şifre en fazla 32 karakter olmalıdır.',
            'password.string' => 'Şifre geçerli bir metin olmalıdır.',
            'password.min' => 'Şifre en az 6 karakter olmalıdır.',

            'remember.boolean' => 'Hatırla seçeneği doğru veya yanlış (true/false) olmalıdır.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }
        return true;
    }

    protected function attemptLogin(Request $request): bool
    {
        return $this->guard()->attempt(
            $this->credentials($request), $request->filled('remember')
        );
    }

    protected function guard(): Guard|StatefulGuard
    {
        return Auth::guard();
    }

    protected function createToken($request)
    {
        $user = $request->user();
        $tokenResult = $user->createToken('Personal Access');
        $token = $tokenResult->token;

        if ($request->remember) {
            $token->expires_at = Carbon::now()->addDays(30);
        }else{
            $token->expires_at = Carbon::now()->addDays(2);
        }

        $token->save();
        return $token;
    }

    protected function credentials(Request $request): array
    {
        return $request->only(['email', 'password']);
    }

    protected function sendFailedLoginResponse(): JsonResponse
    {
        return response()->json(['message' => 'Giriş yapılamadı, bilgileri kontrol edin ve tekrar deneyin'], 401);
    }

    protected function sendLoginResponse(Request $request, $token): JsonResponse
    {
        if ($this->authenticated($request, $request->user()) instanceof JsonResponse) {
            return $this->authenticated($request, $request->user());
        }

        return response()->json([
            'success' => true,
            'message' => 'Successfully',
            'data' => [
                'user' => $this->guard()->user(),
                'token' => [
                    'access_token' => $token,
                    'token_type' => 'Bearer',
                    'expires_at' => Carbon::parse($token->expires_at)->toDateTimeString(),
                ]
            ]
        ]);
    }

    protected function authenticated(Request $request, User $user)
    {
        //todo auth başarılıysa ve fonksiyon kullanılan class içerisinde doldurulursa && eğer json ise sadece burası dönecek
    }


    public function logout(Request $request)
    {
        $this->guard()->logout();
        $user = $request->user();
        $accessToken = $user->token();

        if ($accessToken) {
            $accessToken->revoke();
        }

        return response()->json([
            'success' => true,
            'message' => 'Successfully logged out',
            'data' => []
        ], 204);
    }


}
