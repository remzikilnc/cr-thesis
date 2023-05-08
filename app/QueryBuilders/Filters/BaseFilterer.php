<?php namespace App\QueryBuilders\Filters;

use App\QueryBuilders\CustomQueryBuilderFilters;
use Illuminate\Database\Eloquent\Builder;
use Laravel\Scout\Builder as ScoutBuilder;

abstract class BaseFilterer
{
    /**
     * @var CustomQueryBuilderFilters
     */
    protected $filters;

    /**
     * @var string
     */
    protected $searchTerm;

    /**
     * @var Builder
     */
    protected $query;

    public function __construct($query, CustomQueryBuilderFilters $filters, string $searchTerm = null)
    {
        $this->filters = $filters;
        $this->query = $query;
        $this->searchTerm = $searchTerm;
    }

    abstract public function apply(): ?ScoutBuilder;
}
