import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'ui-monospace', 'SF Mono', 'Fira Code', 
               'Cascadia Code', 'Consolas', 'monospace'],
        terminal: ['JetBrains Mono', 'ui-monospace', 'SF Mono', 'monospace'],
      },
      colors: {
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
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        // Terminal-specific colors
        terminal: {
          green: "hsl(var(--terminal-green))",
          amber: "hsl(var(--terminal-amber))",
          red: "hsl(var(--terminal-red))",
          blue: "hsl(var(--terminal-blue))",
        },
        ascii: {
          border: "hsl(var(--ascii-border))",
        },
        code: {
          bg: "hsl(var(--code-bg))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        none: "0",
      },
      borderWidth: {
        '3': '3px',
      },
      // Custom animations for terminal effects
      animation: {
        'cursor-blink': 'cursor-blink 1s step-end infinite',
        'type-cursor': 'type-cursor 1s ease-in-out infinite',
      },
      keyframes: {
        'cursor-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'type-cursor': {
          '0%, 100%': { width: '0' },
          '50%': { width: '0.5em' },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
