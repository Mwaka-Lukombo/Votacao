/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary-color":"#4F46e5",
        "secundary-color":"#6366F1",
        "primary-green":"#106884",
        "black-color":"#0F172A",
        "back-cyan":"#324155",
        "cyan-black":"#647488",
        "white-color":"#78FAFC",
        "side-bar-color":"#ecebfa",
        "sidebar-menu":"#bcbadb"
      }
    },
  },
  plugins: [],
}