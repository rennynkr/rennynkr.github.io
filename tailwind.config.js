/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
      colors: {
        cream: {
          50: '#fdfaf5',
          100: '#f7f0e0',
          200: '#ede0c4',
        },
        bark: {
          400: '#a0856a',
          600: '#6b4f35',
          800: '#3b2a1a',
        },
        ink: {
          900: '#1a1209',
        },
      },
    },
  },
  plugins: [],

}
