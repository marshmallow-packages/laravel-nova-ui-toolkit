<?php

namespace Marshmallow\LaravelNovaUiToolkit;

use Illuminate\Support\ServiceProvider as LaravelServiceProvider;
use Laravel\Nova\Nova;

class ServiceProvider extends LaravelServiceProvider
{
    public function boot(): void
    {
        $this->loadViewsFrom(__DIR__ . '/../resources/views', 'nova-ui-toolkit');

        $this->publishes([
            __DIR__ . '/../config/nova-ui-toolkit.php' => config_path('nova-ui-toolkit.php'),
        ], 'nova-ui-toolkit-config');

        Nova::serving(function () {
            Nova::script('nova-ui-toolkit', __DIR__ . '/../dist/js/tool.js');
            Nova::style('nova-ui-toolkit', __DIR__ . '/../dist/css/tool.css');

            // Pass configuration to frontend in multiple ways to ensure it works
            Nova::provideToScript([
                'nova_ui_toolkit' => config('nova-ui-toolkit', []),
                'novaUiToolkitConfig' => config('nova-ui-toolkit', [])
            ]);
        });
    }

    public function register(): void
    {
        $this->mergeConfigFrom(
            __DIR__ . '/../config/nova-ui-toolkit.php',
            'nova-ui-toolkit'
        );
    }
}
