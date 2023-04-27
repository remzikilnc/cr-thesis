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
            return response()->badRequest('Validation errors',$validator->errors());
        }
        return true;
    }

    protected function attemptLogin(Request $request): bool
    {
        return $this->guard()->attempt(
            $this->credentials($request)
        );
    }

    protected function guard(): Guard|StatefulGuard
    {
        return Auth::guard();
    }

    protected function createToken($request)
    {
        $user = $request->user();
        $token = $user->createToken('Personal Access')->plainTextToken;
        return [
            'expires_at' => Carbon::now()->addMinutes(10080)->toDateTimeString(),
            'access_token' => $token,
            'token_type' => 'Bearer'
            ];
    }

    protected function credentials(Request $request): array
    {
        return $request->only(['email', 'password']);
    }

    protected function sendFailedLoginResponse(): JsonResponse
    {
        return response()->badRequest('Giriş yapılamadı, bilgileri kontrol edin ve tekrar deneyin');
    }

    protected function sendLoginResponse(Request $request, $token): JsonResponse
    {
        if ($this->authenticated($request, $request->user()) instanceof JsonResponse) {
            return $this->authenticated($request, $request->user());
        }

        $user = $this->guard()->user()->toNormalizedArray();
        return response()->ok([
                'user' => $user,
                'token' => $token
            ]);
    }

    protected function authenticated(Request $request, User $user)
    {
        //todo auth başarılıysa ve fonksiyon kullanılan class içerisinde doldurulursa && eğer json ise sadece burası dönecek
    }


    public function logout(Request $request)
    {
        $user = $request->user();
        if ($user){
            $accessToken = $user->currentAccessToken();
            if ($accessToken) {
                $accessToken->delete();
                $this->guard()->logout();
            }
        }
        $this->guard()->logout();
        return response()->noContent();
    }



}
