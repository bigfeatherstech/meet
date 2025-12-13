/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        samsung: {
          blue: '#1428a0',
          'blue-light': '#1a34c7',
          dark: '#000000',
          gray: '#f5f5f5',
          'light-gray': '#f8f8f8',
          border: '#e0e0e0',
          'text-gray': '#666666'
        }
      }
    },
  },
  plugins: [],
}