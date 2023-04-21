<?php namespace Common\Auth;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Contracts\Translation\HasLocalePreference;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\DatabaseNotification;
use Illuminate\Notifications\DatabaseNotificationCollection;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

/**
 * @property int $id
 * @property string|null $username
 * @property string|null $first_name
 * @property string|null $last_name
 * @property string|null $gender
 * @property string $email
 * @property string $password
 * @property string|null $remember_token
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property int $stripe_active
 * @property string $avatar
 * @property-read string $display_name
 * @property-read mixed $followers_count
 * @property-read bool $has_password
 * @property-read DatabaseNotificationCollection|DatabaseNotification[] $notifications
 * @method BaseUser compact()
 * @method Builder whereNeedsNotificationFor(string $eventId)
 */
abstract class BaseUser extends Authenticatable
{
    use Notifiable,
        HasRoles;

    const MODEL_TYPE = 'user';

    protected $guarded = ['id', 'avatar'];
    protected $hidden = [
        'password',
        'remember_token',
    ];
    protected $casts = [
        'id' => 'integer',
        'email_verified_at' => 'datetime',
    ];
    protected $appends = ['model_type'];
    protected $gravatarSize;


    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
    }





/*    public function social_profiles()
    {
        return $this->hasMany(SocialProfile::class);
    }*/


    /**
     * Send the password reset notification.
     *
     */
/*    public function sendPasswordResetNotification($token)
    {
        ResetPassword::$createUrlCallback = function ($user, $token) {
            return url("password/reset/$token");
        };
        $this->notify(new ResetPassword($token));
    }*/

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
            'username' => $this->username,
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

    public function toNormalizedArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->display_name,
            'description' => $this->email,
            'image' => $this->avatar,
            'model_type' => self::MODEL_TYPE,
        ];
    }

    public static function getModelTypeAttribute(): string
    {
        return self::MODEL_TYPE;
    }
}
