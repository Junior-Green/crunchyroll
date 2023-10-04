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
      backgroundImage: {
        'premium-background-desktop': "url('/assets/images/background-desktop.webp')",
        'premium-background-tablet': "url('/assets/images/background-tablet.webp')",
        'premium-background-mobile': "url('/assets/images/background-mobile.webp')",
        'offline-background': "url('/assets/images/offline-bg.jpg')",
      },
      // // that is actual animation
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
        crunchyroll: {
          orange: "#F47521",
          yellow: "#fab818"
        }
      }
    },
  },
  plugins: [],
}

