import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
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
          DEFAULT: "#2D5A87", // Dyp, rolig blå
          foreground: "#FFFFFF",
          50: "#F0F4F8",
          100: "#D9E6F2",
          200: "#B3CCE5",
          300: "#8DB3D8",
          400: "#6799CB",
          500: "#4A7FA7", // Hovedfarge
          600: "#2D5A87",
          700: "#1E3A5F",
          800: "#0F1D37",
          900: "#050A0F",
        },
        secondary: {
          DEFAULT: "#8B9D83", // Varm, naturlig grønn
          foreground: "#FFFFFF",
          50: "#F5F7F4",
          100: "#E8EDE6",
          200: "#D1DBCD",
          300: "#BAC9B4",
          400: "#A3B79B",
          500: "#8B9D83",
          600: "#6B7A64",
          700: "#4B5745",
          800: "#2B3426",
          900: "#0B1107",
        },
        accent: {
          DEFAULT: "#C4A484", // Varm beige/terracotta
          foreground: "#2D2D2D",
          50: "#FAF8F5",
          100: "#F2EDE6",
          200: "#E5DBCD",
          300: "#D8C9B4",
          400: "#CBB79B",
          500: "#C4A484",
          600: "#A68A6B",
          700: "#7A6450",
          800: "#4E3E35",
          900: "#22181A",
        },
        muted: {
          DEFAULT: "#F8F6F3", // Varm hvit/krem
          foreground: "#5A5A5A",
        },
        destructive: {
          DEFAULT: "#D97757", // Varm rød
          foreground: "#FFFFFF",
        },
        success: {
          DEFAULT: "#7BA05B", // Naturlig grønn
          foreground: "#FFFFFF",
        },
        warning: {
          DEFAULT: "#E6B17A", // Varm oransje
          foreground: "#2D2D2D",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#2D2D2D",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#2D2D2D",
        },
      },
      borderRadius: {
        lg: "12px",
        md: "8px",
        sm: "6px",
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "sans-serif",
        ],
        heading: ["Cal Sans", "Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.5" }],
        sm: ["0.875rem", { lineHeight: "1.6" }],
        base: ["1rem", { lineHeight: "1.7" }],
        lg: ["1.125rem", { lineHeight: "1.7" }],
        xl: ["1.25rem", { lineHeight: "1.6" }],
        "2xl": ["1.5rem", { lineHeight: "1.5" }],
        "3xl": ["1.875rem", { lineHeight: "1.4" }],
        "4xl": ["2.25rem", { lineHeight: "1.3" }],
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(45, 90, 135, 0.08), 0 10px 20px -2px rgba(45, 90, 135, 0.04)",
        medium: "0 4px 25px -5px rgba(45, 90, 135, 0.12), 0 10px 30px -5px rgba(45, 90, 135, 0.08)",
        large: "0 10px 40px -10px rgba(45, 90, 135, 0.15), 0 20px 50px -10px rgba(45, 90, 135, 0.1)",
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
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
