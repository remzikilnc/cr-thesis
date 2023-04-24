<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Laravel</title>
    @viteReactRefresh()
    @vite(['resources/css/app.css','resources/js/index.jsx'])
</head>
<body>

<div id="root"></div>

<script> window.bootstrapData = @json($bootstrapData); </script>
<noscript>You need to have javascript enabled in order to use <strong>CRThesis</strong>.</noscript>

</body>
</html>
