/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0F172A",
          blue: "#2563EB",
          black: "#000000",
          white: "#FFFFFF",
        },
      },
      boxShadow: {
        card: "0 10px 30px -20px rgba(15, 23, 42, 0.35)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
