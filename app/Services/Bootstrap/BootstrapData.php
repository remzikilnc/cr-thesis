<?php


namespace App\Services\Bootstrap;


interface BootstrapData
{
    /**
     * Get data needed to bootstrap the application.
     *
     * @return string
     */
    public function getEncoded(): string;

    /**
     * @return self
     */
    public function init();

}
