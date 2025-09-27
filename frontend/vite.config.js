import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  server: {
    allowedHosts: ['ok2buy-1.onrender.com', 'localhost'], // Add your allowed hosts here
  },
  plugins: [react()],
  host: true,
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
