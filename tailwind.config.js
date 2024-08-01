/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        peg: '#414a4c',
      },
      boxShadow: {
        piece: 'inset 8px 8px rgb(0 0 0 / 0.05);',
      },
    },
  },
  plugins: [],
};
