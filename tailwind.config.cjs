/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        schuss: {
          red: '#FF2D2D',
          blue: '#0A2342',
          white: '#FFFFFF',
          yellow: '#FFC107',
        }
      },
    },
  },
  plugins: [],
}