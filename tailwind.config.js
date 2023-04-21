/** @type {import('tailwindcss').Config} */
module.exports = {
    important: true,
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.jsx",
        "./resources/**/*.js",
    ],
    theme: {
        extend: {
            colors: {
                themePrimary: '#fc3404',
                themeDarkPrimary: '#1a171e',
                themeBlack:'#0d0d0f',
                darkdrop: '#1a171e',
                themePassive:'#B5B5BE',
                themeLighterPassive:'#E0E0E0',
                themeActive:'#fcfcfc',
            },
            fontSize:{
                xsm: '12px',
                xxsm: '10px'
            }
        },
    },
    plugins: [],
}
