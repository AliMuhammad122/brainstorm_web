const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light mode colors
        primary: "#6FCECC",
        heading: "#333333",
        primaryText: "#8E8E8E",
        secondaryText: "#777777",
        success: "#4CAF50",
        danger: "#E71C0D",
        warning: "#FF9800",
        secondary: "#E8E8E8",
        accent: "#EBF7FD",
        borderColor: "#E8E8E8",
        secondaryBorderColor: "#4F4F4F",
        background: "#fff",
        secondaryBackground: "#F6F6F6",
      },
      fontFamily: {
        body: ['"DM Sans"', 'sans-serif'],
        heading: ['"Nunito"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
