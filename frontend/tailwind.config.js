/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        "transparent-black": "rgba(0, 0, 0, 0.2) ",
        "main-background": "#1E1E1E",
        "text-color": "#D9D9D9",
        "secondary-background": "#2C2C2C",
        "border-main": "#4A4A4A",
        "text-input": "#7D7D7D",
        "casinoplus-blue": "#009ADB", //casino-plus blue
        "casinoplus-red": "#DD3E37", //casino-plus red
        "casinoplus-yellow": "#E9C501", //casino-plus yellow
        "casinoplus-green": "#79A31E", //casino-plus green
        "casinoplus-orange": "#F08535", //casino-plus orange
        "casinoplus-pink": "#CD587B", //casino-plus pink
  
      },
    },
  },
  plugins: [],
};
