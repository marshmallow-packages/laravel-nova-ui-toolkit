const mix = require('laravel-mix');

mix
  .setPublicPath('dist')
  .js('resources/js/tool.js', 'js')
  .css('resources/css/tool.css', 'css')
  .version();