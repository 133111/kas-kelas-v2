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
                    bg: '#f8fafc',
                    card: '#ffffff',
                    surface: '#f1f5f9',
                    border: '#e2e8f0',
                },
                accent: {
                    teal: '#0d9488',
                    indigo: '#4f46e5',
                },
                gray: {
                    50: '#0f172a',
                    100: '#1e293b',
                    200: '#334155',
                    300: '#475569',
                    400: '#64748b',
                    500: '#94a3b8',
                    600: '#cbd5e1',
                    700: '#e2e8f0',
                    800: '#f1f5f9',
                    900: '#f8fafc',
                }
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'float-slow': 'float 10s ease-in-out infinite',
                'float-reverse': 'float-reverse 7s ease-in-out infinite',
                'shimmer': 'shimmer 3s ease-in-out infinite',
                'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
                'gradient-shift': 'gradient-shift 8s ease infinite',
                'slide-up': 'slide-up-fade 0.5s ease-out forwards',
                'scale-in': 'scale-in 0.3s ease-out forwards',
                'spin-slow': 'spin-slow 12s linear infinite',
                'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
                'ring-pulse': 'ring-pulse 2s ease-out infinite',
                'gradient-text': 'gradient-text-flow 4s ease infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                    '25%': { transform: 'translateY(-12px) rotate(1deg)' },
                    '50%': { transform: 'translateY(-6px) rotate(-1deg)' },
                    '75%': { transform: 'translateY(-18px) rotate(0.5deg)' },
                },
                'float-reverse': {
                    '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                    '25%': { transform: 'translateY(14px) rotate(-1deg)' },
                    '50%': { transform: 'translateY(6px) rotate(1deg)' },
                    '75%': { transform: 'translateY(20px) rotate(-0.5deg)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
                'pulse-glow': {
                    '0%, 100%': { boxShadow: '0 0 0 0 rgba(13, 148, 136, 0)' },
                    '50%': { boxShadow: '0 0 20px 4px rgba(13, 148, 136, 0.12)' },
                },
                'gradient-shift': {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' },
                },
                'slide-up-fade': {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'scale-in': {
                    '0%': { opacity: '0', transform: 'scale(0.92)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                'spin-slow': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
                'bounce-subtle': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-4px)' },
                },
                'ring-pulse': {
                    '0%': { boxShadow: '0 0 0 0 rgba(13, 148, 136, 0.4)' },
                    '70%': { boxShadow: '0 0 0 8px rgba(13, 148, 136, 0)' },
                    '100%': { boxShadow: '0 0 0 0 rgba(13, 148, 136, 0)' },
                },
                'gradient-text-flow': {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' },
                },
            },
        },
    },

    plugins: [forms],
};
