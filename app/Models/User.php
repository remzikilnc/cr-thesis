<?php

namespace App\Models;


use Common\Auth\BaseUser;
use Laravel\Sanctum\HasApiTokens;

/*use Illuminate\Support\Collection;
use App\ListModel;
use App\Review;
use Common\Comments\Comment;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;*/

class User extends BaseUser
{
    use HasApiTokens;

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
}
