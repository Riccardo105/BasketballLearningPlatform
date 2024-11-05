/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,ejs}"],
  theme: {
    extend: {
      keyframes: {
        growDown: {
          '0%': {transform: 'scaleY(0)'},
          '80%': {transform: 'scaleY(1.1)'},
          '100%': {transform: 'scaleY(1)'},
        }
      },
      animation: {
        growDown: 'growDown 0.3s ease-out forwards'
      }
    },
  },
  plugins: [],
}

