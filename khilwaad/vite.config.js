import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  server: {
    allowedHosts: [
      '8d85-2409-40d1-10c0-8c78-58ce-9a8e-3205-b535.ngrok-free.app'
    ]
  }
});
