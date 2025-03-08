/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Ensure Tailwind scans all relevant folders
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        barnRed: "#780000",
        fireBrick: "#c1121f",
        papayaWhip: "#fdf0d5",
        prussianBlue: "#003049",
        airSuperiorityBlue: "#669bbc",
      },
    },
  },
  plugins: [],
};
