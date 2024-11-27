// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // Enable dark mode
  theme: {
    extend: {
      colors: {
        darkGold: '#a16010',
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Add theme colors
        'theme': {
          light: {
            background: "var(--background)",
            bg: '#ffffff',
            text: '#1a1a1a',
            surface: '#f5f5f5',
            border: '#e5e5e5',
          },
          dark: {
            background: "var(--background)",
            bg: '#1a1a1a',
            text: '#f5f5f5',
            surface: '#2a2a2a',
            border: '#404040',
          }
        }
      },
      fontFamily: {
        playfair: ['var(--playfair, serif)'],
        nunito: ['var(--font-nunito)'],
        cinzel: 'var(--font-cinzel-decorative)',
      },
    },
  },
  plugins: [],
};

export default config;