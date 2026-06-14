/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Fallback für legacy Dateien
  ],
  theme: {
    extend: {
      colors: {
        quantiva: {
          ink: '#050505',
          'ink-soft': '#111111',
          'ink-muted': '#252525',
          paper: '#ffffff',
          'paper-soft': '#f7f6ff',
          mist: '#ebe9fa',
          signal: '#d9ff80',
          'signal-soft': '#f0f7e0',
          violet: '#5241d4',
          'violet-soft': '#dedafe',
          blue: '#0078a8',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'Helvetica Neue',
          'Arial',
          'Helvetica',
          'sans-serif',
        ],
      },
      boxShadow: {
        'valmax-soft': '0 18px 60px rgba(0, 0, 0, 0.28)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 3s ease infinite',
        'particle': 'float-particle 3s ease-in-out infinite',
        'marquee': 'marquee 24s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '33%': { transform: 'translateY(-20px) translateX(10px)' },
          '66%': { transform: 'translateY(-10px) translateX(-10px)' },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'float-particle': {
          '0%': { transform: 'translateY(0px) translateX(0px) scale(0)', opacity: '0' },
          '50%': { transform: 'translateY(-20px) translateX(10px) scale(1)', opacity: '1' },
          '100%': { transform: 'translateY(-40px) translateX(20px) scale(0)', opacity: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      perspective: {
        '1000': '1000px',
        '2000': '2000px',
      },
      transformStyle: {
        'preserve-3d': 'preserve-3d',
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '40px',
        '3xl': '64px',
      },
    },
  },
  plugins: [],
}
