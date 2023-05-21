<?php namespace App\QueryBuilders\Filters;

use App\QueryBuilders\CustomQueryBuilderFilters;
use App\QueryBuilders\Traits\SupportsMysqlFilters;
use Laravel\Scout\Builder as ScoutBuilder;


class MysqlFilterer
{
    use SupportsMysqlFilters;

    public function __construct($query, CustomQueryBuilderFilters $filters, string $searchTerm = null)
    {
        $this->filters = $filters;
        $this->query = $query;
        $this->searchTerm = $searchTerm;
    }

    public function apply(): ?ScoutBuilder
    {
        $this->applyMysqlFilters($this->filters, $this->query);

        if ($this->searchTerm) {
            $this->query->mysqlSearch($this->searchTerm);
        }

        return null;
    }
}
