/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        fan: {
          pink: '#FF8FB1',
          blue: '#7DD3FC',
          purple: '#C4B5FD',
          mint: '#86EFAC',
          yellow: '#FDE68A',
          ink: '#3B2A4A',
        },
      },
      fontFamily: {
        sans: ['"Nunito Variable"', 'ui-rounded', 'system-ui', 'sans-serif'],
        display: ['"Baloo 2"', '"Nunito Variable"', 'ui-rounded', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
