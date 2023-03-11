/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        h1: [
          "48px",
          {
            lineHeight: "48px",
            letterSpacing: "-0.012em",
            fontWeight: "800",
          },
        ],
        h2: [
          "30px",
          {
            lineHeight: "36px",
            letterSpacing: "-0.0075em",
            fontWeight: "600",
          },
        ],
        h3: [
          "24px",
          {
            lineHeight: "32px",
            letterSpacing: "-0.006em",
            fontWeight: "600",
          },
        ],
        h4: [
          "20px",
          {
            lineHeight: "28px",
            letterSpacing: "-0.005em",
            fontWeight: "600",
          },
        ],
        large: [
          "18px",
          {
            lineHeight: "28px",
            fontWeight: "600",
          },
        ],
        "body-medium": [
          "14px",
          {
            lineHeight: "24px",
            fontWeight: "500",
          },
        ],
        detail: [
          "12px",
          {
            lineHeight: "20px",
            fontWeight: "500",
          },
        ],
      },
    },
  },
  plugins: [],
};
