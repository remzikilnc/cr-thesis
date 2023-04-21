<?php namespace Common\Auth\Controllers;

use App\Models\User;
use Common\Auth\Requests\LoginRequest;
use Common\Core\BaseController;
use Common\Core\Bootstrap\BootstrapData;
use Common\Settings\Settings;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class LoginController extends BaseController
{

    private $bootstrapData;
    private $settings;
    public function __construct(BootstrapData $bootstrapData, Settings $settings)
    {
        $this->middleware('guest', ['except' => 'logout']);

        $this->bootstrapData = $bootstrapData;
        $this->settings = $settings;
    }

    /**
     * @throws ValidationException
     */
    public function login(LoginRequest $request): JsonResponse
    {
        if ($this->attemptLogin($request)) {
            if ($request->hasSession()) {
                $request->session()->put('auth.password_confirmed_at', time());
            }
            $request->session()->regenerate();
            return $this->success();
        }

        return $this->error('Giriş yapılamadı, bilgileri kontrol edin ve tekrar deneyin', [], 404);

    }

    protected function authenticated(Request $request, User $user)
    {
        if ($this->settings->get('single_device_login')) {
            Auth::logoutOtherDevices($request->get('password'));
        }

        $data = $this->bootstrapData->init()->getEncoded();

        return $this->success(['data' => $data]);
    }

    protected function attemptLogin($request): bool
    {
        return Auth::guard()->attempt(
            $request->only('email', 'password'), $request->filled('remember')
        );
    }

    public function logout(Request $request)
    {
        Auth::guard()->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();


        return response()->json([], 204);
    }
}
