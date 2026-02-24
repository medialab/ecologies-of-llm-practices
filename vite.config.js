import { sveltekit } from "@sveltejs/kit/vite";
import { enhancedImages } from "@sveltejs/enhanced-img";
import { defineConfig } from "vite";

// vite.config.js

export default defineConfig({
  plugins: [
    enhancedImages({
      imagetools: {
        defaultDirectives: () => {
          return new URLSearchParams({
            format: "jpg",
            quality: "80",
          });
        },
      },
    }),
    sveltekit(),
  ],
  server: {
    port: 3000, // Change this number to your desired port
  },
  build: {
    target: ["chrome100", "edge100", "firefox102", "safari15"],
    rollupOptions: {
      // Nothing to see here
    },
  },
});
