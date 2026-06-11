/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        'spotify-black': '#121212',
        'spotify-dark': '#181818',
        'spotify-card': '#282828',
        'spotify-green': '#1DB954',
        'spotify-text': '#FFFFFF',
        'spotify-secondary': '#B3B3B3',
      },
      spacing: {
        'sidebar': '240px',
        'player': '90px',
      },
    },
  },
  plugins: [],
};
