<?php namespace Common;
use App\Models\User;
use Common\Core\BaseController;
use Common\Settings\Settings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Spatie\Permission\Models\Role;

class TestController extends BaseController {
    protected $role;
    protected $settings;
    protected $data;
    protected $request;


    public function __construct(Settings $settings,Request $request,Role $role)
    {
        $this->role = $role;
        $this->request = $request;
        $this->settings = $settings;


    }

    public function testPost(Request $request){
        return Session::all();
    }

    public function getCurrentUser(): ?User
    {

    }
}
