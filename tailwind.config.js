/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  safelist: [
    "grid-rows-4",
    "grid-cols-4",
    "grid-rows-5",
    "grid-cols-5",
    "grid-rows-6",
    "grid-cols-6",
    "grid-rows-8",
    "grid-cols-8",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {},
  },
  plugins: [],
};
