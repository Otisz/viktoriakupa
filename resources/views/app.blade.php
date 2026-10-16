<!DOCTYPE html>
<html lang="hu" class="motion-safe:scroll-smooth">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
    <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
    <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />

    <link rel="manifest" href="/site.webmanifest" crossOrigin="use-credentials" />

    <link rel="preload" href="/fonts/capriola/capriola-latin.woff2" as="font" type="font/woff2" crossorigin>

    @php
        $organizationSchema = [
            '@context' => 'https://schema.org',
            '@type' => 'SportsOrganization',
            'name' => config('app.name'),
            'url' => config('app.url'),
            'logo' => url('/images/logo_vk.png'),
            'sport' => 'Akrobatikus torna',
            'email' => 'akrobatikustornakupa@gmail.com',
            'telephone' => '+36203111919',
            'sameAs' => ['https://www.facebook.com/profile.php?id=100064131873913'],
            'parentOrganization' => [
                '@type' => 'SportsOrganization',
                'name' => 'Magyar Torna Szövetség',
            ],
        ];
    @endphp
    <script type="application/ld+json">{!! json_encode($organizationSchema, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG) !!}</script>

    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    <x-inertia::head>
        <title>{{ config('app.name', 'Laravel') }}</title>
    </x-inertia::head>
</head>
<body class="bg-background font-sans text-foreground antialiased">
@inertia
</body>
</html>
