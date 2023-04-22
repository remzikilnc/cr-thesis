<?php namespace App\Http\Controllers\Auth;

use App\Http\Controllers\BaseController;
use App\Http\Traits\Auth\AuthenticatesUser;
use App\Models\User;
use App\Services\Settings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class LoginController extends BaseController
{
    use AuthenticatesUser;

    private $settings;

    public function __construct (Settings $settings)
    {
        $this->middleware('guest', ['except' => 'logout']);
        $this->settings = $settings;
    }


    protected function authenticated(Request $request, User $user)
    {
        if ($this->settings->get('single_device_login')) {
            Auth::logoutOtherDevices($request->get('password'));
        }
    }

}
