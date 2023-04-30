<?php

namespace App\Models;

use App\Abstracts\BaseUser;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends BaseUser
{
    protected $guard_name = 'api';

/*    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }*/
}
