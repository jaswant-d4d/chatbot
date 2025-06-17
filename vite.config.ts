import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // This maps @ to src/
    },
  },
  // base: '/chatbot-site/wp-content/plugins/chatbot-shortcode/dist/',
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets', // You can keep this or change to 'images' if needed
  },
});