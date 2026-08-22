import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        game: {
          bg: "#090d16",
          card: "rgba(18, 24, 38, 0.85)",
          tile: {
            empty: "rgba(30, 41, 59, 0.5)",
            border: "#334155",
            active: "#38bdf8",
            correct: "#10b981",
            present: "#f59e0b",
            absent: "#334155",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-aladin)", "cursive", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      animation: {
        "pop": "pop 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        "flip": "flip 0.5s ease-in-out forwards",
        "shake": "shake 0.45s cubic-bezier(.36,.07,.19,.97) both",
        "bounce-subtle": "bounceSubtle 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        "glow-pulse": "glowPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.25s ease-out forwards",
        "scale-up": "scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      boxShadow: {
        "key-idle": "0 3px 0 0 rgba(15, 23, 42, 0.9), 0 4px 8px rgba(0, 0, 0, 0.4)",
        "key-active": "0 0 0 0 rgba(0, 0, 0, 0.5)",
        "key-special": "0 3px 0 0 rgba(29, 78, 216, 0.9), 0 4px 10px rgba(59, 130, 246, 0.3)",
        "tile-pop": "0 0 15px rgba(56, 189, 248, 0.35)",
        "modal": "0 25px 50px -12px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.1)",
      },
    },
  },
  plugins: [],
};
export default config;

