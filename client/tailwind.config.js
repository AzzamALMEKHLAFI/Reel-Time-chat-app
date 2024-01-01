/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        "2screen/3": "70vw",
        "screen/3": "30vw",
      },
      height: {
        screenV2: "90vh",
      },
    },
  },
  plugins: [],
};
