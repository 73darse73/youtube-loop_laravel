<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="light">
    <head>
        <meta charset="utf-8">
        <!-- Dark mode flash prevention -->
        <script>
            (function() {
                var t = localStorage.getItem('theme');
                if (t !== 'light') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                }
            })();
        </script>
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- SEO -->
        <meta name="description" content="YouTubeの好きな区間をループ再生・保存できるサービス。語学学習・楽器練習・ダンス練習に。無料で使えます。">
        <link rel="canonical" href="{{ url()->current() }}">

        <!-- OGP -->
        <meta property="og:type" content="website">
        <meta property="og:site_name" content="Loop Player">
        <meta property="og:title" content="Loop Player — YouTube区間ループ再生">
        <meta property="og:description" content="YouTubeの好きな区間をループ再生・保存できるサービス。語学学習・楽器練習・ダンス練習に。無料で使えます。">
        <meta property="og:url" content="{{ url()->current() }}">
        <meta property="og:image" content="{{ url('/images/ogp.png') }}">
        <meta property="og:locale" content="ja_JP">

        <!-- Twitter Card -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="Loop Player — YouTube区間ループ再生">
        <meta name="twitter:description" content="YouTubeの好きな区間をループ再生・保存できるサービス。語学学習・楽器練習・ダンス練習に。無料で使えます。">
        <meta name="twitter:image" content="{{ url('/images/ogp.png') }}">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Google AdSense -->
        @if(config('services.adsense.client'))
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client={{ config('services.adsense.client') }}" crossorigin="anonymous"></script>
        @endif

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
