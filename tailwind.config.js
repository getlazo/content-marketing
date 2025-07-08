/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'lazo-dark': '#0f0f1b',
        'lazo-purple': '#1c1029',
        'lazo-accent': '#8b5cf6',
        'lazo-light': '#a78bfa',
        'lazo-pink': '#E6A9C3',
        'lazo-pink-dark': '#C97CA3',
        'lazo-pink-light': '#F7D6E5',
        'lazo-bg': '#FFF8FB',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'tilt': 'tilt 10s infinite linear',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        tilt: {
          '0%, 50%, 100%': {
            transform: 'rotateY(0deg) rotateX(0deg)',
          },
          '25%': {
            transform: 'rotateY(1deg) rotateX(1deg)',
          },
          '75%': {
            transform: 'rotateY(-1deg) rotateX(-1deg)',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
      },
    },
  },
  plugins: [],
} 