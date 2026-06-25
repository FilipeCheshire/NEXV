import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-manrope)", "Manrope", "sans-serif"],
        poppins: ["var(--font-poppins)", "Poppins", "sans-serif"],
        manrope: ["var(--font-manrope)", "Manrope", "sans-serif"],
        display: ["var(--font-poppins)", "Poppins", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        primary: "#11D5CA",
        secondary: "#1D35F7",
        "blue-light": "#3154FE",
        "green-dark": "#0B7FAB",
        "bg-dark": "#07111F",
        "card-dark": "#0F1B2D",
        "text-main": "#FFFFFF",
        "text-second": "#D6E2F0",
        "text-muted": "#8AA0B8",
        line: "#1a2b42",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(20, 217, 196, 0.2)" },
          "100%": { boxShadow: "0 0 20px rgba(20, 217, 196, 0.6)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
