/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber': {
          'bg-main': '#05070d',
          'bg-panel': 'rgba(10, 15, 30, 0.6)',
          'neon-blue': '#00f0ff',
          'neon-purple': '#7a00ff',
          'neon-green': '#00ff9c',
          'neon-pink': '#ff00e5',
          'text-main': '#d9faff',
          'text-dim': '#7a8fa5',
        }
      },
      fontFamily: {
        'mono': ['Fira Code', 'Consolas', 'Monaco', 'monospace'],
        'system': ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neon-blue': '0 0 10px #00f0ff, 0 0 20px #00f0ff, 0 0 30px #00f0ff',
        'neon-purple': '0 0 10px #7a00ff, 0 0 20px #7a00ff, 0 0 30px #7a00ff',
        'neon-green': '0 0 10px #00ff9c, 0 0 20px #00ff9c, 0 0 30px #00ff9c',
      },
      animation: {
        'glitch': 'glitch 1s infinite',
        'typing': 'typing 3.5s steps(40, end)',
        'blink': 'blink 0.75s step-end infinite',
        'scanline': 'scanline 8s linear infinite',
        'flicker': 'flicker 0.15s infinite',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        blink: {
          'from, to': { borderColor: 'transparent' },
          '50%': { borderColor: '#00f0ff' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}
