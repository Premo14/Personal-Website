import scrollbar from 'tailwind-scrollbar';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        scrollbar: '#B38E2C',
        scrollbarTrack: '#1e1e1e',
        brand: {
          DEFAULT: '#D4AF37',
          dark: '#B38E2C',
        },
        accent: {
          DEFAULT: '#E5E4E2',
          dark: '#C0BEBB',
        },

        background: {
          DEFAULT: '#ededed',
          dark: '#121212',
        },
        surface: {
          DEFAULT: '#e1e1e1',
          dark: '#1e1e1e',
        },

        textPrimary: {
          DEFAULT: '#1e1e1e',
          dark: '#f5f5f5',
        },
        textMuted: {
          DEFAULT: '#707070',
          dark: '#cecece',
        },

        border: {
          DEFAULT: '#cccccc',
          dark: '#2A2A2A',
        },
      },
      fontFamily: {
        sans: ['"Zen Dots"', 'cursive'],
        signature: ['"Zen Dots"', 'cursive'],
      },
    },
  },
  variants: {
    scrollbar: ['rounded'],
  },
  plugins: [
    scrollbar,
  ],
};
