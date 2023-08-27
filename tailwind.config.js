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
        crunchyroll : {
          orange: "#F47521"

        }
      }
    },
  },
  plugins: [],
}

