<?php namespace Common\Auth\Controllers;

use Carbon\Carbon;
use Common\Auth\Requests\RegisterRequest;
use Common\Auth\UserRepository;
use Common\Core\BaseController;
use Common\Core\Bootstrap\BootstrapData;
use Common\Core\Bootstrap\MobileBootstrapData;
use Common\Settings\Settings;
use Exception;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class RegisterController extends BaseController
{
    private Settings $settings;
    private UserRepository $repository;

    public function __construct(Settings $settings, UserRepository $repository)
    {
        $this->settings = $settings;
        $this->repository = $repository;

        $this->middleware('guest');

        // abort if registration disabled
        if ($this->settings->get('registration.disable')) abort(403);
    }

    /**
     * @throws ValidationException
     * @throws Exception
     */
    public function register(RegisterRequest $request): Response|JsonResponse
    {
        $params = $request->all();
        if ( ! $this->settings->get('require_email_confirmation')) {
            $params['email_verified_at'] = Carbon::now();
        }

        event(new Registered($user = $this->repository->create($params)));

        if ($user->hasVerifiedEmail()) {
            Auth::guard()->login($user);
        }

        $response = ['status' => $user->hasVerifiedEmail() ? 'success' : 'needs_email_verification'];

        if ($user->hasVerifiedEmail()) {
                $bootstrapData = app(BootstrapData::class)->init();
                $response['bootstrapData'] = $bootstrapData->getEncoded();
        } else {
            $response['message'] = 'Hesabınızı nasıl etkinleştireceğinizle ilgili talimatları içeren bir e-posta gönderdik.';
        }

        return $this->success($response);
    }
}
