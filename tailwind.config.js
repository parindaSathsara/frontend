/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Luxury Gold Palette
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#D4AF37', // Primary Gold
          600: '#B8860B', // Dark Gold
          700: '#996515',
          800: '#7a5012',
          900: '#5c3d0e',
        },
        // Luxury Blacks
        luxury: {
          black: '#0a0a0a',
          dark: '#1a1a1a',
          charcoal: '#2d2d2d',
          gray: '#404040',
          silver: '#a3a3a3',
          pearl: '#f5f5f5',
          white: '#fafafa',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Montserrat', 'Helvetica', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'gold': '0 4px 20px -2px rgba(212, 175, 55, 0.25)',
        'gold-lg': '0 10px 40px -3px rgba(212, 175, 55, 0.3)',
        'luxury': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        'elegant': '0 20px 40px -15px rgba(0, 0, 0, 0.15)',
        'card': '0 8px 30px rgba(0, 0, 0, 0.08)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #F4E4BC 50%, #D4AF37 100%)',
        'dark-gradient': 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
      },
    },
  },
  plugins: [],
}
