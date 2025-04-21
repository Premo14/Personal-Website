// tailwind.config.js
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#6366F1',
          dark: '#4F46E5',
        },
      },
    },
  },
  plugins: [],
};
