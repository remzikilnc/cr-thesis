<?php

namespace App\Actions;
use App\Models\User;
use App\QueryBuilders\CustomQueryBuilder;
use Illuminate\Support\Arr;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;

class PaginateUsers
{


    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function execute($params): LengthAwarePaginator
    {
        $query = $this->user->newQuery()->with(['roles']);


        if ($roleName = Arr::get($params, 'role_name')) {
            $query->whereHas('roles', function (Builder $q) use ($roleName) {
                $q->where('roles.name', $roleName);
            });
        }

        if ($permission = Arr::get($params, 'permission')) {
            $query
                ->whereHas('roles', function (Builder $query) use (
                    $permission
                ) {
                    $query->whereHas('permissions', function (
                        Builder $query
                    ) use ($permission) {
                        $query
                            ->where('name', $permission)
                            ->orWhere('name', 'admin');
                    });
                });
        }

        return (new CustomQueryBuilder($query, $params))->paginate();
    }
}

