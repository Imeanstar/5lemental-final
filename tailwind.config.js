/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.jsx'],
  theme: {
    extend: {
      fontFamily: {
        nanum: ['NanumSquare'],
        dohyeon: ['BMDOHYEON'],
      },
      colors: {
        '--fridge-primary': '#0E3348',
        '--fridge-secondary': '#EBEBEB',
        '--fridge-gray': '#D9D9D9',
        '--fridge-input-gray': '#B0B0B0',
        '--fridge-nav-gray': '#666565',
        '--fridge-bg-gray': '#F5F5F5',
        '--fridge-black': '#000423',
        '--fridge-white': '#FFFFFF',
        '--fridge-skyblue': '#DCF2FF',
        '--fridge-red': '#F83319',
      },
      backgroundImage: {
        'search-icon': "url('@/assets/icons/search.svg')",
      },
    },
  },
  plugins: [],
};
