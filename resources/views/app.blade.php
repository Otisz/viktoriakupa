<!DOCTYPE html>
<html lang="hu" class="scroll-smooth">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title data-inertia>{{ config('app.name', 'Laravel') }}</title>

    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
    <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
    <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />

    <link rel="manifest" href="/site.webmanifest" crossOrigin="use-credentials" />

    <link rel="preload" href="/fonts/capriola/capriola-latin.woff2" as="font" type="font/woff2" crossorigin>

    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    @inertiaHead
</head>
<body class="bg-background font-sans text-foreground antialiased">
@inertia
</body>
</html>
