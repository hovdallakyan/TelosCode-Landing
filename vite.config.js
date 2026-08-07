import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    // The team photos are already compressed by scripts/optimize-images.mjs.
    // Inlining them as base64 would defeat the lazy loading on the carousel.
    assetsInlineLimit: 4096,
  },
});
