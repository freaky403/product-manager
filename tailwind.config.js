/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#A2D2FF",
        "secondary": "#FFA2A2",
        "tertiary": "#CDB4DB",
      }
    },
  },
  plugins: [],
}

