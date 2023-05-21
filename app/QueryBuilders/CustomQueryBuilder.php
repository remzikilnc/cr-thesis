<?php namespace App\QueryBuilders;

use App\QueryBuilders\CustomQueryBuilderFilters;
use App\QueryBuilders\Filters\MysqlFilterer;
use Illuminate\Container\Container;
use Illuminate\Database\Eloquent\Builder as EloquentBuilder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Query\Builder as QueryBuilder;
use Illuminate\Database\Query\Expression;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use Laravel\Scout\Builder as ScoutBuilder;

class CustomQueryBuilder
{

    private EloquentBuilder $builder;
    private Model $model;
    private array $params;
    private bool $queryBuilt = false;
    private \App\QueryBuilders\CustomQueryBuilderFilters $filters;
    public array|null|false $order = null;

    public function __construct(
        $model,
        array $params,
        CustomQueryBuilderFilters $filters = null,
    )
    {
        $this->model = $model->getModel();
        $this->params = $this->toCamelCase($params);
        $this->builder = $model->newQuery();
        $this->filters = $filters ?? new CustomQueryBuilderFilters($this->params['filters'] ?? null);
    }

    public function paginate(): LengthAwarePaginator
    {
        $this->buildQuery();
        $perPage = $this->limit();
        $page = (int)$this->param('page', 1);
        $total = $this->builder->toBase()->getCountForPagination();
        $results = $total ? $this->builder->forPage($page, $perPage)->get() : $this->model->newCollection();

        return Container::getInstance()->makeWith(LengthAwarePaginator::class, [
            'items' => $results,
            'total' => $total,
            'perPage' => $perPage,
            'currentPage' => $page,
            'options' => [
                'path' => Paginator::resolveCurrentPath(),
                'pageName' => 'page',
            ],
        ]);
    }

    public function get(): Collection
    {
        $this->buildQuery();
        return $this->builder->limit($this->limit())->get();
    }

    public function param(string $name, $default = null)
    {
        return Arr::get($this->params, Str::camel($name)) ?: $default;
    }

    public function buildQuery(): self
    {
        if ($this->queryBuilt) {
            return $this;
        }
        $with = array_filter(explode(',', $this->param('with', '')));
        $withCount = array_filter(explode(',', $this->param('withCount', '')));
        $searchTerm = $this->param('query');

        // load specified relations and counts
        if (!empty($with)) {
            $this->builder->with($with);
        }
        if (!empty($withCount)) {
            $this->builder->withCount($withCount);
        }

        $filterer = $this->resolveFilterer($searchTerm);
        $this->scoutBuilder = (new $filterer(
            $this->builder,
            $this->filters,
            $searchTerm,
        ))->apply();

        // allow caller class to override order or
        // prevent it completely by setting "false"
        if ($this->order !== false) {
            $order = $this->getOrder();
            if (isset($order['col'])) {
                $order['col'] =
                    $order['col'] === 'relevance'
                        ? 'relevance'
                        : // can't qualify with table name because ordering by relationship count will not work
                        $order['col'];
                $this->builder->orderBy(
                    Str::snake($order['col']),
                    $order['dir'] ?? 'desc',
                );
            }
        }

        $this->queryBuilt = true;

        return $this;
    }

    private function resolveFilterer(string $searchTerm = null): string
    {
        return MysqlFilterer::class;
    }

    public function getOrder(): array
    {
        $defaultOrderDir = 'desc';
        $defaultOrderCol = 'updated_at';

        if (isset($this->order['col'])) {
            $orderCol = $this->order['col'];
            $orderDir = $this->order['dir'];
            // order might be a single string: "column|direction"
        } elseif ($specifiedOrder = $this->param('order')) {
            $parts = preg_split('(\||:)', $specifiedOrder);
            $orderCol = Arr::get($parts, 0, $defaultOrderCol);
            $orderDir = Arr::get($parts, 1, $defaultOrderDir);
            // order might be as separate params
        } elseif ($this->param('orderBy') || $this->param('orderDir')) {
            $orderCol = $this->param('orderBy');
            $orderDir = $this->param('orderDir');
            // try ordering be relevance, if it's a search query and
            // using mysql fulltext, finally default to "updated_at" column
        } elseif ($this->hasRelevanceColumn()) {
            $orderCol = 'relevance';
            $orderDir = 'desc';
        } else {
            $orderCol = $defaultOrderCol;
            $orderDir = $defaultOrderDir;
            $this->usingDefaultOrder = true;
        }

        return [
            'col' => $orderCol,
            'dir' => $orderDir,
        ];
    }

    private function toCamelCase(array $params): array
    {
        return collect($params)
            ->keyBy(function ($value, $key) {
                return Str::camel($key);
            })
            ->toArray();
    }

    private function hasRelevanceColumn(): bool
    {
        return !!Arr::first($this->getQueryBuilder() ?? [], function ($col) {
            return $col instanceof Expression &&
                Str::endsWith($col->getValue(), 'AS relevance');
        });
    }

    private function limit(): int
    {
        if ($this->param('perPage')) {
            return $this->param('perPage');
        } else {
            return $this->getQueryBuilder()->limit ?? 15;
        }
    }

    private function getQueryBuilder(): QueryBuilder
    {
        $query = $this->builder->getQuery();
        if ($query instanceof EloquentBuilder) {
            $query = $query->getQuery();
        }
        return $query;
    }
}
