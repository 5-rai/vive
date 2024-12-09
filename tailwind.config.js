/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      default: {
        white: "#FFFFFF",
        black: "#000000",
      },
      colors: {
        primary: "#FCC404",
        secondary: "#FBEFBF",
        "red-accent": "#FF2929",
        gray: {
          100: "#222222",
          50: "#C8C8C8",
          0: "#EEEEEE",
        },
      },
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
};
