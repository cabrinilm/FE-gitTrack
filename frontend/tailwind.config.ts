import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B0B0F",
        surface: "#11111A",
        border: "#23233A",

        primary: {
          DEFAULT: "#150578",
          400: "#2E1BE6",
          500: "#1E08A8",
          600: "#150578",
          700: "#0F035A",
        },

        secondary: {
          DEFAULT: "#22C55E",
          500: "#22C55E",
          600: "#16A34A",
        },

        text: {
          primary: "#F1F5F9",
          secondary: "#94A3B8",
          muted: "#64748B",
        },

        success: "#22C55E",
        error: "#EF4444",
        warning: "#F59E0B",
      },
    },
  },
  plugins: [],
}

export default config
