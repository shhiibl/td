/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-main': 'var(--bg-main)',
        'bg-tint': 'var(--bg-tint)',
        'bg-surface': 'var(--bg-surface)',
        'primary-pink': '#D41479',
        'primary-purple': '#6C2A79',
        'sec-lavender': '#D9A8E8',
        'sec-rose': '#F5A0D2',
        'text-primary': '#1A0A1D',
        'text-secondary': 'rgba(26, 10, 29, 0.7)',
      },
      fontFamily: {
        inter: ['var(--font-inter)', 'sans-serif'],
        clash: ['Clash Display', 'sans-serif'],
      },
      borderRadius: {
        'sm': '12px',
        'md': '16px',
        'lg': '20px',
      },
      backdropBlur: {
        'glass': '10px',
      },
    },
  },
  plugins: [],
}
