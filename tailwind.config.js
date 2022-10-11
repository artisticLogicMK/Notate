/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'mic': '281px',
      'xsm': '540px',
      'sm': '640px',
      'md': '768px',
      'md2': '850px',
      'lg': '1024px',
      'lg2': '1140px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {},
  },
  plugins: [],
}