import { defineConfig } from 'astro/config';

export default defineConfig({
  server: {
    proxy: {
      '/graphql': 'http://localhost:8080/graphql'
    }
  }
});
