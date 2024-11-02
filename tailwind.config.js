module.exports = {
  content: [
    './templates/**/*.html',
    './static/js/**/*.{js,jsx,ts,tsx}',
    './static/sass/**/*.scss',
  ],
  purge: false, // отключаем встроенный purge, чтобы полагаться на PurgeCSSPlugin в webpack
  theme: {
    extend: {},
  },
  plugins: [],
};
