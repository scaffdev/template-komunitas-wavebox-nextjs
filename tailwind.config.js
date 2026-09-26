/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#131314',
        surface: '#1C1C1F',
        elevated: '#232327',
        border: '#2C2C31',
        borderlight: '#3A3A41',
        primary: '#F2F2F0',
        muted: '#A7A7B0',
        faint: '#7A7A85',
        accent: '#F472B6',
        accentsoft: '#F9A8D4',
      },
      fontFamily: {
        display: ['var(--font-display)', '"DM Serif Display"', 'serif'],
        sans: ['var(--font-sans)', 'Syne', 'sans-serif'],
      },
      maxWidth: {
        reading: '680px',
        content: '1280px',
      },
      borderRadius: {
        DEFAULT: '4px',
      },
    },
  },
  plugins: [],
}
