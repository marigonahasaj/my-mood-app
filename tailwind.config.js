/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        roll: {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(-66.66%)' },
        },
      },
      animation: {
        roll: 'roll 30s linear infinite',
      },

      fontFamily: {
        sans: ['"Josefin Sans"', 'sans-serif'],
      },
      colors: {
        olive: {
          50: '#f8f9f4',
          100: '#e9eedc',
          200: '#d6e1c2',
          300: '#b7cc96',
          400: '#99b96b',
          500: '#7da146',
          600: '#647c37',
          700: '#4e5e2c',
          800: '#394320',
          900: '#222714',
        },
        tangerine: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
      },
    },
  },
  plugins: [],
}
