/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: 'hsl(var(--card))',
        border: 'hsl(var(--border))',
        primary: 'hsl(var(--primary))',
        'primary-foreground': 'hsl(var(--primary-foreground))',
        legal: 'hsl(var(--legal))',
        restricted: 'hsl(var(--restricted))',
        illegal: 'hsl(var(--illegal))',
      },
      fontFamily: {
        sans: ['var(--font-family)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
