/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FAF9F6',
        lavender: {
          DEFAULT: '#C7B8EA',
          50: '#FBF9FE',
          100: '#F5F1FD',
          200: '#E6DCF8',
          300: '#D7C7F2',
          400: '#C7B8EA',
          500: '#B8A5E2',
          600: '#9883C7',
          700: '#7C67AB',
        },
        charcoal: {
          DEFAULT: '#29272E',
          muted: '#6E6B77',
          light: '#9E9AA7',
          subtle: '#C8C5CE',
        },
        dustyPink: '#E8C5D0',
        paleBlue: '#DCE9F2',
        mutedPurple: '#9883C7',
        borderLine: '#ECEAE4',
      },
      fontFamily: {
        sans: [
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'Roboto',
          '"Helvetica Neue"',
          '"Segoe UI"',
          'sans-serif',
        ],
      },
      boxShadow: {
        soft: '0 2px 12px -2px rgba(41, 39, 46, 0.04), 0 1px 3px rgba(41, 39, 46, 0.02)',
        card: '0 4px 20px -2px rgba(41, 39, 46, 0.05)',
        cta: '0 4px 14px rgba(199, 184, 234, 0.35)',
      },
      borderRadius: {
        card: '20px',
        pill: '9999px',
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-out forwards',
        'fade-up': 'fadeUp 250ms ease-out forwards',
        'floating': 'floatGentle 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-7px)' },
        },
      },
    },
  },
  plugins: [],
}
