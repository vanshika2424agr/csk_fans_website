export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        outfit:  ['"Outfit"', 'sans-serif'],
        inter:   ['"Inter"', 'sans-serif'],
        bebas:   ['"Bebas Neue"', 'cursive'],
        sans:    ['"Inter"', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg:       '#0d1117',
        surface:  '#161b27',
        surface2: '#1e2537',
        orange:   { DEFAULT: '#f97316', light: '#fb923c', dark: '#ea580c' },
        blue:     { DEFAULT: '#3b82f6', light: '#60a5fa', dark: '#2563eb' },
      },
      borderColor: { DEFAULT: 'rgba(255,255,255,0.07)' },
      boxShadow: {
        card:   '0 4px 24px rgba(0,0,0,0.35)',
        orange: '0 8px 24px rgba(249,115,22,0.40)',
        glow:   '0 0 40px rgba(249,115,22,0.20)',
      },
    },
  },
  plugins: [],
}
