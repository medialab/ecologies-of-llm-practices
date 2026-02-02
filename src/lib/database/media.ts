export const tediumImgs = Object.values(
  import.meta.glob("$lib/media/tedium/*.jpg", {
    import: "default",
    eager: true,
    query: {
      enhanced: true,
    },
  }),
);

export const artificialInquiriesImgs = Object.values(
  import.meta.glob("$lib/media/artificial_inquiries/*.{png,jpg,jpeg,webp}", {
    import: "default",
    eager: true,
    query: {
      enhanced: true,
    },
  }),
);
