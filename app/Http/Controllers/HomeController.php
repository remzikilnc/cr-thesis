<?php
namespace App\Http\Controllers;

use App\Services\Bootstrap\BootstrapData;
use App\Services\Settings;

class HomeController extends BaseController {


    public function __construct(BootstrapData $bootstrapData, Settings $settings)
    {
        $this->bootstrapData = $bootstrapData;
        $this->settings = $settings;
    }

	public function show()
	{
	    $view = view('app')
            ->with('bootstrapData', $this->bootstrapData->init()->getEncoded())
            ->with('customHtmlPath', public_path('storage/custom-code/custom-html.html'))
            ->with('customCssPath', public_path('storage/custom-code/custom-styles.css'));
        return response($view);
	}
}
