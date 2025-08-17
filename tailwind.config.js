/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "media",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "sotero-blue": "#2E5090",
        "sotero-green": "#009A44",
      },
    },
  },
  plugins: [],
};
