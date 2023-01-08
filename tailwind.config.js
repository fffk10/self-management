/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/*.{html,js,ts,tsx}",
    "./components/**/*.{html,js,ts,tsx}",
    "./pages/**/*.{html,js,ts,tsx}",
    "./pages/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
