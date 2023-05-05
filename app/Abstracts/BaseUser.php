<?php

namespace App\Abstracts;


use App\Http\Traits\Searchable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Auth\User as Authenticatable;
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

abstract class BaseUser extends Authenticatable
{
    use Notifiable, HasRoles, HasApiTokens, Searchable;

    const MODEL_TYPE = 'user';

    protected $quard_name = 'api';
    protected $guarded = ['id','created_at', 'updated_at', 'avatar'];
    protected $hidden = ['password'];
    protected $casts = ['id' => 'integer', 'email_verified_at' => 'datetime',];
    protected $appends = ['model_type'];

    public function getRoleNamesAttribute(): Collection
    {
        return $this->roles->pluck('name');
    }

    public function withRoleNamesAttribute(): array
    {
        $array = parent::toArray();

        $array['role_names'] = $this->roleNames;

        return $array;
    }


    public function getPermissionNamesAttribute(): Collection
    {
        return $this->getPermissionsViaRoles()->pluck('name');
    }


    public static function getModelTypeAttribute(): string
    {
        return self::MODEL_TYPE;
    }


    /**
     * Get the indexable data array for the model.
     *
     * @return array<string, mixed>
     */
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

    public function toNormalizedArray(): array
    {
        return [
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'image' => $this->avatar,
            'model_type' => self::MODEL_TYPE,
            'role_names' => $this->roleNames,
        ];
    }

    public static function filterableFields(): array
    {
        return ['id', 'created_at', 'updated_at'];
    }

}
