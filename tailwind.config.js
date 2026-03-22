/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.html"],
  theme: {
    extend: {
      colors: {
        gold: '#C9A962',
        cream: '#F5F1E8',
        warmBeige: '#E8DCC8',
        taupe: '#B5A89A',
        espresso: '#1A1410',
        darkBrown: '#2D2520'
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Montserrat', 'sans-serif']
      }
    }
  }
}

