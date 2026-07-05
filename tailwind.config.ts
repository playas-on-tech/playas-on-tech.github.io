import type { Config } from "tailwindcss";

// Design tokens mirror the original prototype's inline tailwind.config exactly.
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      colors: {
        navy: { DEFAULT: "#0A1230", 900: "#070B22", 800: "#0B1437", 700: "#141E4A" },
        sunset: { DEFAULT: "#FF6B4A", 400: "#FF8A5C", 300: "#FFB066" },
        ocean: { DEFAULT: "#15A6BC", 400: "#2DD4BF", 300: "#5EE0D0" },
        cream: { DEFAULT: "#FBF6EE", 100: "#FCF9F3" },
        keynote: { DEFAULT: "#9E85BF" },
        panel: { DEFAULT: "#8C99AB" },
        comida: { DEFAULT: "#EAC53B" },
      },
      letterSpacing: { tightest: "-0.04em" },
    },
  },
  plugins: [],
};

export default config;
