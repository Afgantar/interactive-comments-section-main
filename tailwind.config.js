/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'desktop': '1440px',
        'laptop' : '1024px',
        'small-device' : '560px',
        'medium-device' : '760px',
        'mobile': '420px',
      },
      colors: {
        'moderate-blue': 'hsl(238, 40%, 52%)',
        'soft-red': 'hsl(358, 79%, 66%)',
        'light-grayish-blue': 'hsl(239, 57%, 85%)',
        'pale-red': 'hsl(357, 100%, 86%)',
        'dark-blue': 'hsl(212, 24%, 26%)',
        'grayish-blue': 'hsl(211, 10%, 45%)',
        'light-gray': 'hsl(223, 19%, 93%)',
        'very-light-gray': 'hsl(228, 33%, 97%)',
        'white': 'hsl(0, 0%, 100%)',
      },
      keyframes: {
        slideRight: {
          'from': { transform: 'translateX(-150px)', opacity: 0 },
          'to': { transform: 'translateX(0)', opacity: 1 },
        },
        summon: {
          'from': { transform: 'scale(0.3)', opacity: 0 },
          'to': { transform: 'scale(1)', opacity: 1 },
        },
      },
      animation: {
        'slideRight': 'slideRight ease-in-out 1s forwards',
        'summon': 'summon ease-in-out 0.75s forwards',
      }
    },
  },
  plugins: [],
}

