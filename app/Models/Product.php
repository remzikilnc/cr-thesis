<?php

namespace App\Models;

use App\Http\Traits\Searchable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Str;

/**
 */
class Product extends Model
{
    use Searchable;

    const MODEL_TYPE = 'product';
    protected $guarded = ['id','created_at', 'updated_at'];
    protected $appends = ['model_type'];
    public $hidden = [
        'price' => 'float',
        'rating' => 'float',
        'status' => 'boolean',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($product) {
            if(empty($product->code)) { // eğer kod yoksa
                $product->code = Str::upper(Str::random(10)); //rand kod
            }
        });
    }

    /**
     * @return MorphMany
     */
    public function images(): MorphMany
    {
        return $this->morphMany(Image::class, 'model')
            ->select(['id', 'model_id', 'model_type', 'url', 'type'])
            ->orderBy('order', 'asc');
    }

    /**
     * @return BelongsToMany
     */
    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class);

    }


    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

/*    public function comments(): MorphMany
    {
        return $this->morphMany(Comment::class, 'commentable')->orderBy(
            'created_at',
            'desc',
        );
    }*/

    public function toSearchableArray(): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'code' => $this->code,
            'popularity' => $this->popularity,
            'created_at' => $this->created_at->timestamp ?? '_null',
            'updated_at' => $this->updated_at->timestamp ?? '_null',
        ];
    }

    public static function filterableFields(): array
    {
        return ['id', 'created_at', 'updated_at','popularity'];
    }

    public function toNormalizedArray(): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => Str::limit($this->description, 100),
            'image' => $this->poster,
            'model_type' => self::MODEL_TYPE,
        ];
    }

    public static function getModelTypeAttribute(): string
    {
        return self::MODEL_TYPE;
    }
}
