/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#f6f6f6',
        'bg-secondary': '#ffffff',
        text: '#000000',
        'text-secondary': '#666666',
        primary: '#888888',
        secondary: '#aaaaaa',
        border: '#eaeaea',
      },
      spacing: {
        xs: '10.6667px',
        sm: '21.3334px',
        md: '42.6668px',
        lg: '64.0002px',
        xl: '85.3336px',
      },
      borderRadius: {
        btn: '16px',
        card: '32px',
      },
      fontFamily: {
        sans: ['Switzer', 'system-ui', 'sans-serif'],
      },
      screens: {
        xs: '380px',
      },
      backgroundImage: {
        'gradient-conic': 'conic-gradient(var(--conic-position), var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}