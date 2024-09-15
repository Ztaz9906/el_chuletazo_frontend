/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow:{
        'inner-custom': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.3)',
      },
      fontFamily: {
        'default': ['sans-serif', 'sans-serif'],
        'rounded': ['"M PLUS Rounded 1c"', 'sans-serif'],

      },
    },
  },
  plugins: [],
}

