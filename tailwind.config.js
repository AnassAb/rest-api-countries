/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}", "./js/*.js"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "blue-dark": "hsl(209, 23%, 22%)",
        "blue-dark-bg": "hsl(207, 26%, 17%)",
        "blue-dark-light": "hsl(200, 15%, 8%)",
        "gray-dark": "hsl(0, 0%, 52%)",
        "gray-light-bg": "hsl(0, 0%, 98%)",
        white: "hsl(0, 0%, 100%)",
      },
    },
    fontFamily: {
      Nunito: ["Nunito Sans", "sans-serif", "monospace"],
    },
    screens: {
      sm: "450px",
      md: "650px",
      lg: "950px",
      xl: "1280px",
      "2xl": "1575px",
      "3xl": "1990px",
      "4xl": "2300px",
    },
  },
  plugins: [],
};
