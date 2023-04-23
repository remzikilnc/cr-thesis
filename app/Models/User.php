<?php

namespace App\Models;


use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\DatabaseNotification;
use Illuminate\Notifications\DatabaseNotificationCollection;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Collection;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

/*use Illuminate\Support\Collection;
use App\ListModel;
use App\Review;
use Common\Comments\Comment;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;*/

class User extends Authenticatable
{
    use Notifiable, HasRoles, HasApiTokens;

    const MODEL_TYPE = 'user';

    protected $guarded = ['id','created_at', 'updated_at', 'avatar'];
    protected $hidden = ['password', 'remember_token'];
    protected $casts = ['id' => 'integer', 'email_verified_at' => 'datetime',];
    protected $appends = ['model_type'];


    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
    }


    /*
        public function reviews(): HasMany
        {
            return $this->hasMany(Review::class);
        }

        public function lists(): HasMany
        {
            return $this->hasMany(ListModel::class);
        }

    */

    public static function findAdmin(): ?self
    {
        //Todo
    }

    public function refreshApiToken($tokenName): string
    {
        $this->tokens()->where('name', $tokenName)->delete();
        $newToken = $this->createToken($tokenName);
        $this->withAccessToken($newToken->accessToken);
        return $newToken->plainTextToken;
    }

    public function toSearchableArray(): array
    {
        return [
            'id' => $this->id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'email' => $this->email,
            'created_at' => $this->created_at->timestamp ?? '_null',
            'updated_at' => $this->updated_at->timestamp ?? '_null',
        ];
    }

    public static function filterableFields(): array
    {
        return ['id', 'created_at', 'updated_at'];
    }



    public function getRoleNamesAttribute(): Collection
    {
        return $this->roles->pluck('name');
    }

    public function getPermissionNamesAttribute(): Collection
    {
        return $this->getPermissionsViaRoles()->pluck('name');
    }

    public function toNormalizedArray()
    {
        $array = parent::toArray();

        $array['role_names'] = $this->roleNames;
        $array['permission_names'] = $this->permissionNames;

        return $array;
    }

    public static function getModelTypeAttribute(): string
    {
        return self::MODEL_TYPE;
    }

}
