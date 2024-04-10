/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto-250': 'repeat(auto-fill, minmax(250px, 1fr))',
      },
      colors: {
        'primary-purple': '#54458a'
      }
    },
  },
  plugins: [],
};
