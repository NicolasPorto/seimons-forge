/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forge: {
          bg: '#080808',
          card: '#111111',
          border: '#1e1e1e',
          muted: '#2a2a2a',
          fire: '#f97316',
          ember: '#fb923c',
          glow: '#fdba74',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'forge-gradient': 'radial-gradient(ellipse at top, #1a0a00 0%, #080808 60%)',
        'fire-gradient': 'linear-gradient(135deg, #f97316 0%, #fb923c 50%, #fbbf24 100%)',
        'card-gradient': 'linear-gradient(145deg, #161616 0%, #0e0e0e 100%)',
      },
      boxShadow: {
        'fire': '0 0 30px rgba(249, 115, 22, 0.15)',
        'fire-sm': '0 0 15px rgba(249, 115, 22, 0.1)',
        'card': '0 4px 24px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
}
