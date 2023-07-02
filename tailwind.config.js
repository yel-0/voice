/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        custom1: "#9B5366",
        custom2: "#FF8978",
        custom3: "#B6B3BF",
        custom4: "#EDD251",
        custom5: "#F7B18C",
        custom6: "#B0C972",
        custom7: "#F8766B",
      },
    },
  },
  plugins: [require("daisyui")],
};
