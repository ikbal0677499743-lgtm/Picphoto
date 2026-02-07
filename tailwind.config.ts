import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        accent: {
          DEFAULT: "#E91E63",
          light: "#FCE4EC",
          dark: "#C2185B",
        },
        surface: "#F9FAFB",
        muted: "#6B7280",
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
        cursive: ['var(--font-dancing-script)', 'cursive'],
      },
    },
  },
  plugins: [],
};
export default config;
