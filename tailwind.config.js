import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                dark: {
                    bg: '#0f1117',
                    card: '#1a1d29',
                    surface: '#252836',
                    border: '#2e3348',
                },
                accent: {
                    teal: '#2dd4bf',
                    indigo: '#818cf8',
                }
            }
        },
    },

    plugins: [forms],
};

