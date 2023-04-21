<?php namespace Common\Core\Bootstrap;

use App\Models\User;
use Common\Settings\Settings;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cookie;
use Spatie\Permission\Models\Role;

class BaseBootstrapData implements BootstrapData
{

    protected $settings;
    protected $request;
    protected $role;
    protected $data = [];

    public function __construct(Settings $settings, Request $request, Role $role) {
        $this->role = $role;
        $this->request = $request;
        $this->settings = $settings;
    }

    public function getEncoded(): string
    {
        if ($this->data['user']) {
            $this->data['user'] = $this->data['user']->toArray();
        }

        return base64_encode(json_encode($this->data));
    }

    public function get($key = null)
    {
        return $key ? Arr::get($this->data, $key) : $this->data;
    }


    public function init()
    {
        $this->data['settings'] = $this->settings->all();
        $this->data['csrf_token'] = csrf_token();
        $this->data['settings']['base_url'] = config('app.url');
        $this->data['settings']['version'] = config('common.site.version');
        $this->data['user'] = $this->getCurrentUser();
        $this->data['guests_role'] = $this->role
            ->where('guests', 1)
            ->with('permissions')
            ->first();
        return $this;
    }

    /**
     * Load current user and roles.
     */
    public function getCurrentUser(): ?User
    {
        $user = $this->request->user();
        if ($user) {
            // load user roles, if not already loaded
            if (!$user->relationLoaded('roles')) {
                $user->load('roles');
            }
        }

        return $user;
    }

}
