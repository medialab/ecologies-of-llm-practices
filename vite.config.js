import { sveltekit } from "@sveltejs/kit/vite";
import { enhancedImages } from "@sveltejs/enhanced-img";
import { defineConfig } from "vite";

// vite.config.js

export default defineConfig({
  plugins: [
    enhancedImages({
      imagetools: {
        defaultDirectives: (url) => {
          console.log("🖼️ Processing image:", url.pathname);
          const params = new URLSearchParams({
            format: "jpg",
            quality: "80",
          });
          console.log("📐 Applied directives:", params.toString());
          return params;
        },
      },
    }),
    sveltekit(),
  ],
  server: {
    port: 3000, // Change this number to your desired port
  },
  build: {
    rollupOptions: {
      // Nothing to see here
    },
  },
  kit: {
    prerender: {
      handleHttpError: "warn",
    },
  },
});
