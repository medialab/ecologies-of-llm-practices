import { sveltekit } from "@sveltejs/kit/vite";
import { enhancedImages } from "@sveltejs/enhanced-img";
import { defineConfig } from "vite";

// vite.config.js

export default defineConfig({
  plugins: [enhancedImages(), sveltekit()],
  build: {
    rollupOptions: {
      // Nothing to see here
    },
  },
});
