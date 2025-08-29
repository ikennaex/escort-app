/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customLightGray: '#29283f',
        customGray: '#13121f',
        customPink: '#fc037b',
      },
    },
  },
  plugins: [],
}