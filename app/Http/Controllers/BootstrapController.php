<?php namespace App\Http\Controllers;

use App\Services\Bootstrap\BootstrapData;
use App\Services\Bootstrap\MobileBootstrapData;
use Illuminate\Http\JsonResponse;

class BootstrapController extends BaseController
{
    /**
     * Get data needed to bootstrap the application.
     *
     * @param BootstrapData $bootstrapData
     * @return JsonResponse
     */
    public function getBootstrapData(BootstrapData $bootstrapData)
    {
        return response()->json(['data' => $bootstrapData->init()->getEncoded()]);
    }

    public function getMobileBootstrapData(MobileBootstrapData  $bootstrapData)
    {
        return response()->json($bootstrapData->init()->get());
    }
}
