/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite/**/*.js",
    "./src/**/*.{html,ts}",
  ],
  theme: {
  },
  plugins: [ require('flowbite/plugin')],
}

