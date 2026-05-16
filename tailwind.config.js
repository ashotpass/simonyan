import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/**/*.blade.php',
        './resources/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                gold: '#B8860B',
                cream: '#FAF8F3',
                charcoal: '#1F2937',
            },
            fontFamily: {
                'serif-hy': ['"Noto Serif Armenian"', 'serif'],
                'sans-hy': ['"Noto Sans Armenian"', ...defaultTheme.fontFamily.sans],
                'serif-en': ['"Playfair Display"', 'serif'],
                'sans-en': ['Inter', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [],
};
