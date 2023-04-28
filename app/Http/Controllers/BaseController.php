<?php namespace App\Http\Controllers;

use App\Http\Traits\HandlesSeo;
use App\Models\User;
use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;

class BaseController extends Controller
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests,HandlesSeo;

    /**
     * Authorize a given action for the current user
     * or guest if user is not logged in.
     *
     * @param  mixed  $ability
     * @return bool
     */
    public function auth($ability): bool
    {
        if (Auth::check()) {
            $user = User::find(Auth::id());
            return $user->can($ability);
        } else {
            $guest = new User();
            // make sure ID is not NULL to avoid false positives in authorization
            $guest->forceFill(['id' => -1]);

            // Spatie/laravel-permission paketi kullanarak misafir rolünü alın
            $guestRole = Role::where('guests', 1)->first();

            if ($guestRole) {
                // Misafir rolünü kullanıcıya atayın
                $guest->assignRole($guestRole);
            }
            return $guest->can($ability);
        }
    }

    /**
     * @param array $data
     * @param int $status
     * @param array $options
     * @return JsonResponse|Response
     */
    public function success($data = [], $status = 200, $options = [])
    {
        $data = $data ?: [];
        if ( ! Arr::get($data, 'success')) {
            $data['success'] = true;
        }

        // only generate seo tags if request is coming from frontend and not from API
/*        if (request()->isFromFrontend() && $response = $this->handleSeo($data, $options)) {
            return $response;
        }*/

        foreach($data as $key => $value) {
            if ($value instanceof Arrayable) {
                $data[$key] = $value->toArray();
            }
        }

        return response()->json($data, $status);
    }

    /**
     * Return error response with specified messages.
     */
    public function error(string $message = '', array $errors = [], int $status = 422, $data = []): JsonResponse
    {
        if ( ! Arr::get($data, 'success')) {
            $data['success'] = false;
        }
        $data = array_merge(
            $data,
            ['message' => $message, 'errors' => $errors ?: []],
        );
        return response()->json($data, $status);
    }
}
