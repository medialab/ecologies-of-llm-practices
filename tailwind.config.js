/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Instrument Sans"', "Helvetica", "sans-serif"],
        serif: ['"Instrument Serif"', '"Times New Roman"', "Times", "serif"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    // ...
  ],
};
