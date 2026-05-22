import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

import react from '@astrojs/react';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    server: {
      proxy: {
        '/graphql': {
          target: 'http://localhost:8080',
          changeOrigin: true,
        },
      },
    },
  },

  integrations: [react()]
});