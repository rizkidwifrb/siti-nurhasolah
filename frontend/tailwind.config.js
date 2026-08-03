/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FFF9F5',
        blush: '#F5B8C8',
        peach: '#FFCDB2',
        lavender: '#CFC4FF',
        sage: '#C8DDBD',
        ink: '#2A2528',
        muted: '#726A6E',
        burgundy: '#80515E',
        line: '#E8DDE0',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 18px 45px -28px rgba(128, 81, 94, 0.34)',
        lift: '0 24px 60px -34px rgba(42, 37, 40, 0.36)',
      },
      borderRadius: {
        organic: '58% 42% 45% 55% / 45% 48% 52% 55%',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
