module.exports = {
  purge: {
    content: ["./**/*.html", "./**/*.js"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},

    colors: {
      blue: {
        100 : "#E4EBF2",
        200 : "#BFBFBF",
        300 : "#318DCA",
        400 : "#34407D",
        500 : "#253342",
      },
      white: {
        100: "#FCFCFF",
      },
    },
    fontFamily: {
      sans: [
        "Poppins",
      ],
      serif: [
      ],
      mono: [
      ],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
