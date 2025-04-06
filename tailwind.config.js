/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        keyframes: {
          'pulse-scale': {
            '0%, 100%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.05)' },
          },
          fadeIn: {
            '0%': { opacity: 0 },
            '100%': { opacity: 1 },
          },
        },
        animation: {
          'fade-in': 'fadeIn 0.3s ease-out',
          'pulse-scale': 'pulse-scale 2s ease-in-out infinite',
          'spin-slow': 'spin 15s linear infinite', // Gira lento (3 segundos)
          'spin-medium': 'spin 8s linear infinite', // Velocidad media
          'spin-fast': 'spin 1s linear infinite', // Gira rápido (0.5 segundos)
        },
        fontFamily: {
          k2d: ['K2D', 'sans-serif'], // Define la fuente K2D
          inter: ['inter', 'sans-serif'], 
        },
      },
    },
    plugins: [],
  }
  