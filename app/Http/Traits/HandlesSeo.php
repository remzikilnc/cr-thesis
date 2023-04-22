<?php

namespace App\Http\Traits;

use App\Helpers\MetaTags;

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
