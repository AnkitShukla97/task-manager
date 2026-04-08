/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        display: ["Syne", "sans-serif"],
      },
      colors: {
        surface: {
          base: "#0D0D12",
          raised: "#13131A",
          card: "#16161F",
          hover: "#1A1A26",
          border: "#1E1E2E",
        },
      },
      borderRadius: {
        xl2: "14px",
      },
    },
  },
  plugins: [],
};
