export const tediumImgs = Object.values(
  import.meta.glob("$lib/media/tedium/*.jpg", {
    import: "default",
    eager: true,
    query: {
      enhanced: true,
    },
  }),
);
