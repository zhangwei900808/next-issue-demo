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
      screens: {
        'hideEle': { 'raw': '(max-width: 1280px)' },
        // => @media (max-height: 800px) { ... }
      },
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
