<?php namespace App\Http\Controllers\Auth;

use App\Http\Controllers\BaseController;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Traits\Auth\AuthenticatesUser;
use App\Repositories\UserRepository;
use App\Services\Settings;
use Carbon\Carbon;
use Exception;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;
use Throwable;

class RegisterController extends BaseController
{
    use AuthenticatesUser;

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
     * @throws Exception|Throwable
     */
    public function register(RegisterRequest $request): Response|JsonResponse
    {
        $params = $request->only([
            'first_name','last_name','email','password'
        ]);
        if ( ! $this->settings->get('require_email_confirmation')) {
            $params['email_verified_at'] = Carbon::now();
        }

        event(new Registered($user = $this->repository->create($params)));

        if ($user->hasVerifiedEmail()) {
            $this->login($request);
        }

        $response = ['status' => $user->hasVerifiedEmail() ? 'success' : 'needs_email_verification'];

        if ($user->hasVerifiedEmail()) {
            return $this->login($request);
        } else {
            $response['message'] = 'Hesabınızı nasıl etkinleştireceğinizle ilgili talimatları içeren bir e-posta gönderdik.';
            return $this->success($response);
        }
    }
}
