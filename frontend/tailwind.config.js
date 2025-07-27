/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Dark mode controlled by class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2196F3',      // Main blue
        secondary: '#4CAF50',    // Accent green
        background: '#E3F2FD',   // Light blue background
        warning: '#FF9800',
        error: '#F44336',
        success: '#66BB6A',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      spacing: {
        section: '32px',
        component: '24px',
        element: '16px',
        micro: '8px',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.5' },
          '50%': { transform: 'scale(1.1)', opacity: '0.8' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'fade-in': {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        'fade-in-up': {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.8s ease-out both',
        'pulse-slow': 'pulse-slow 6s ease-in-out infinite',
        'float-slow': 'float-slow 5s ease-in-out infinite',
        'bounce-slow': 'bounce-slow 4s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.5s ease-out both',
      },
    },
  },
  plugins: [],
};
