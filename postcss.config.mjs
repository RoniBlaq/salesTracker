const config = {
  content: [
   "./pages/*.js",
   "./pages/*.jsx",
   "./components/*.js",
    "./components/*.jsx"
  ],
 
  theme: {
    extend: {
      fontFamily: {
        oxygen: ['Oxygen', 'sans-serif'],
      },
    },
  },
  plugins: ["@tailwindcss/postcss"],
};
 module.exports =config;



export default config;
