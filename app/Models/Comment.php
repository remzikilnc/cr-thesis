<?php

namespace App\Models;

use App\Http\Traits\Searchable;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use Searchable;

    protected $fillable = ['comment'];

    /**
     * Get the product that the comment belongs to.
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Get the user that made the comment.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
