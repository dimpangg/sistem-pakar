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
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
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
        p: [
          "16px",
          {
            lineHeight: "28px",
            fontWeight: "400",
          },
        ],
        "p-ui": [
          "16px",
          {
            lineHeight: "24px",
            fontWeight: "400",
          },
        ],
        "p-ui-medium": [
          "16px",
          {
            lineHeight: "24px",
            fontWeight: "500",
          },
        ],
        body: [
          "14px",
          {
            lineHeight: "24px",
            fontWeight: "400",
          },
        ],
        "body-medium": [
          "14px",
          {
            lineHeight: "24px",
            fontWeight: "500",
          },
        ],
        subtle: [
          "14px",
          {
            lineHeight: "20px",
            fontWeight: "400",
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
  plugins: [require("tailwindcss-animate")],
};
