import adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    paths: {
      base: "",
    },

    adapter: adapter({}),

    alias: {
      $styles: "/src/lib/styles",
      $media: "src/lib/media",
      $database: "src/lib/database",
      $routes: "src/routes",
      $videos: "src/lib/media/videos",
    },
    prerender: {
      handleHttpError: ({ path, referrer, message }) => {
        // ignore deliberate link to shiny 404 page
        if (
          path === "/not-found" &&
          referrer === "/blog/how-we-built-our-404-page"
        ) {
          return;
        }

        // otherwise fail the build
        throw new Error(message);
      },
    },
    inlineStyleThreshold: Infinity,
  },
};

export default config;
