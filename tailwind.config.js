/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter Variable"', "Vazirmatn", "system-ui", "sans-serif"],
        fa: ["Vazirmatn", '"Inter Variable"', "sans-serif"],
      },
      keyframes: {
        blink: { "0%,100%": { opacity: 1 }, "50%": { opacity: 0.2 } },
        rise: { from: { opacity: 0, transform: "translateY(6px)" }, to: { opacity: 1, transform: "none" } },
      },
      animation: { blink: "blink 1s ease-in-out infinite", rise: "rise .25s ease-out" },
    },
  },
  plugins: [],
};
