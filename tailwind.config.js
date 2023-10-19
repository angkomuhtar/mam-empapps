/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff1f2',
          100: '#ffe0e2',
          200: '#ffc6c9',
          300: '#ff9fa4',
          400: '#ff676f',
          500: '#fb3640',
          600: '#e91924',
          700: '#c4111a',
          800: '#a21219',
          900: '#86161c',
          950: '#490609',
        },
      },
    },
    fontFamily: {
      mont: ['Montserrat', 'sans'],
      mono: ['Montserrat'],
    },
  },
  plugins: [],
};
