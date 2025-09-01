import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
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
        // Custom professional color palette
        'ash-gray': {
          DEFAULT: '#9f9f92',
          100: '#20201d',
          200: '#41413a',
          300: '#616156',
          400: '#828273',
          500: '#9f9f92',
          600: '#b2b2a9',
          700: '#c5c5be',
          800: '#d9d9d4',
          900: '#ecece9'
        },
        'tea-green': {
          DEFAULT: '#c9d5b5',
          100: '#2a321c',
          200: '#546539',
          300: '#7e9755',
          400: '#a3b882',
          500: '#c9d5b5',
          600: '#d3ddc3',
          700: '#dee6d2',
          800: '#e9eee1',
          900: '#f4f7f0'
        },
        'timberwolf': {
          DEFAULT: '#e3dbdb',
          100: '#322727',
          200: '#634e4e',
          300: '#947676',
          400: '#bba8a8',
          500: '#e3dbdb',
          600: '#e8e1e1',
          700: '#ede9e9',
          800: '#f3f0f0',
          900: '#f9f8f8'
        },
        'drab-brown': {
          DEFAULT: '#322e18',
          100: '#0a0a05',
          200: '#15130a',
          300: '#1f1d0f',
          400: '#292614',
          500: '#322e18',
          600: '#6e6635',
          700: '#a99c51',
          800: '#c7be8a',
          900: '#e3dec4'
        },
        'marian-blue': {
          DEFAULT: '#253a81',
          100: '#080c1a',
          200: '#0f1834',
          300: '#17244e',
          400: '#1e3068',
          500: '#253a81',
          600: '#3554b7',
          700: '#607ad1',
          800: '#95a7e0',
          900: '#cad3f0'
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "button-press": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(0.95)" },
          "100%": { transform: "scale(1)" }
        },
        "button-bounce": {
          "0%, 20%, 50%, 80%, 100%": { transform: "translateY(0)" },
          "40%": { transform: "translateY(-4px)" },
          "60%": { transform: "translateY(-2px)" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "button-press": "button-press 0.15s ease-in-out",
        "button-bounce": "button-bounce 0.6s ease-in-out"
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config