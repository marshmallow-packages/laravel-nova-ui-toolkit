# Laravel Nova UI Toolkit

A comprehensive UI toolkit for Laravel Nova that provides optional UI/UX enhancements to improve Nova's interface and user experience.

## Features

### Sticky Action Buttons
- **Problem**: Action buttons in index tables are positioned at the end of rows, requiring horizontal scrolling to access them when tables have many columns
- **Solution**: Makes action buttons stick to the right side of the screen, keeping them always visible during horizontal scrolling

## Installation

1. Add the package to your Laravel Nova project:

```bash
composer require marshmallow/laravel-nova-ui-toolkit
```

2. Publish the configuration file:

```bash
php artisan vendor:publish --tag=nova-ui-toolkit-config
```

3. Configure the features you want to enable in `config/nova-ui-toolkit.php`:

```php
return [
    'sticky_action_buttons' => true, // Enable sticky action buttons
];
```

## Configuration

All features are **opt-in** by default. Enable only the features you want to use.

### Sticky Action Buttons

```php
// config/nova-ui-toolkit.php
'sticky_action_buttons' => true,
```

When enabled, action buttons in index tables will:
- Remain visible during horizontal scrolling
- Maintain proper hover states and styling
- Work with Nova's dark mode
- Gracefully disable on mobile devices for better UX

## Browser Support

- Modern browsers with CSS sticky positioning support
- Responsive design that disables sticky behavior on mobile
- Dark mode compatible

## Development

### Building Assets

```bash
npm install
npm run production
```

### Local Development

```bash
npm run dev
npm run watch
```

## Future Features

This package is designed to be extensible. Future features may include:
- Enhanced filter interfaces
- Compact table views
- Custom color schemes
- Improved responsive layouts

All features will remain opt-in to maintain compatibility with existing Nova installations.

## License

MIT