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
        'permit-or-registration': 'hsl(var(--permit-or-registration))',
        illegal: 'hsl(var(--illegal))',
      },
      fontFamily: {
        sans: ['var(--font-family)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
