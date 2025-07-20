/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        glassBg: "rgba(255, 255, 255, 0.15)",  // translucent white
        primary: '#4A90E2',  // soft blue
        accent: '#7B8D93',   // slate gray
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '10px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
