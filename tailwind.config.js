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
    "bg-tile-0",
    "bg-tile-2",
    "bg-tile-4",
    "bg-tile-8",
    "bg-tile-16",
    "bg-tile-32",
    "bg-tile-64",
    "bg-tile-128",
    "bg-tile-256",
    "bg-tile-512",
    "bg-tile-1024",
    "bg-tile-2048",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },

    extend: {
      colors: {
        "purple-500": "#442482",
        "tile-0": "#2B1C47",
        "tile-2": "#ED64E5",
        "tile-4": "#CD7DFF",
        "tile-8": "#895AFF",
        "tile-16": "#7BA1FF",
        "tile-32": "#42AEFF",
        "tile-64": "#00CFC3",
        "tile-128": "#00BC84",
        "tile-256": "#ACC800",
        "tile-512": "#E7A600",
        "tile-1024": "#FF7A00",
        "tile-2048": "#FF004D",
      },
      boxShadow: {
        button: "0px 8px 0px #2C1455",
      },
    },
  },
  plugins: [],
};
