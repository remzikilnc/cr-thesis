<?php namespace App\Http\Controllers;

use App\Http\Traits\HandlesSeo;
use Illuminate\Contracts\Auth\Access\Gate;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;

use App\Models\User;
use Spatie\Permission\Models\Role;


class BaseController extends Controller
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests, HandlesSeo;

    public function authorize($ability, $arguments = [])
    {
        if (Auth::check()) {
            [$ability, $arguments] = $this->parseAbilityAndArguments($ability, $arguments);
            return app(Gate::class)->authorize($ability, $arguments);
        } else {
            $guest = new User();
            $guest->forceFill(['id' => -1]);
            $guest->setRelation('roles', collect([Role::where('guests', 1)->first()]));
            return $this->authorizeForUser($guest, $ability, $arguments);
        }
    }
}
