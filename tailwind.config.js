/**@type {import('tailwindcss').config} */

export default {
  content: [
   "./src/app/**/*.{js,jsx}",
   "./src/components/**/*.{js,jsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        oxygen: ['Oxygen', 'sans-serif'],
      },
    },
  },
  plugins: [],
};