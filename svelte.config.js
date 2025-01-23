import adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    paths: {
      base: process.env.NODE_ENV === "production" ? "/EL2MP" : "", // Updated to match new repository name
    },

    adapter: adapter({}),

    alias: {
      $styles: "/src/lib/styles",
      $media: "src/lib/media",
      $database: "src/lib/database",
      $routes: "src/routes",
      $videos: "src/lib/media/videos",
    },
  },
};

export default config;
