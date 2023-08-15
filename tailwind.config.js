/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      animation: {
        fade: 'fadeIn 500ms ease-in-out',
      },

      // that is actual animation
      keyframes: theme => ({
        fadeIn: {
          '100%': {
            opacity: 1,
          },
          '0%': {
            opacity: 0,
          },
        },
      }),
      colors: {
        netflix : {
          red: "#E50914",
          black: "#000000",
          white: "#221F1F",
          gray: "#221F1F"

        }
      }
    },
  },
  plugins: [],
}

