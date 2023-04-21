<?php

namespace Common\Core\Prerender;

use Illuminate\Http\Response;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Str;

trait HandlesSeo
{
    /**
     * @param array $data
     * @param array $options
     */
    protected function handleSeo(&$data = [], $options = [])
    {
/*        if (Request::method() === 'GET') {
            todo getMetaTags  $data['seo'] =
        }*/

    }

    protected function getMetaTags($data = [], $options = []): ?MetaTags
    {
        return null;
    }

}
