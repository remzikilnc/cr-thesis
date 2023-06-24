<?php

namespace App\Actions;

use App\Models\Comment;
use App\QueryBuilders\CustomQueryBuilder;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class PaginateComments
{

    private Comment $comment;

    public function __construct(Comment $comment)
    {
        $this->comment = $comment;
    }

    public function execute(array $params): LengthAwarePaginator
    {
        $productId = request()->route('product'); // URL'den product parametresini alır.

        $query = $this->comment->newQuery()->where('product_id', $productId);

        if (Gate::forUser(Auth::user())->allows('comments.viewInactive')) {
            $query->where(function ($q) {
                $q->where('status', 1)->orWhere('status', 0);
            });
        } else {
            $query->where('status', 1);
        }

        $query->join('users', 'comments.user_id', '=', 'users.id')
            ->select('comments.*', DB::raw("CONCAT(users.first_name, ' ', users.last_name) AS name"));

        return (new CustomQueryBuilder($query, $params))->paginate();
    }
}
