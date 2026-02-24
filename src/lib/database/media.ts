const tediumImgModules = import.meta.glob("$lib/media/tedium/*.jpg", {
  import: "default",
  query: {
    enhanced: true,
  },
});

const artificialInquiriesImgModules = import.meta.glob(
  "$lib/media/artificial_inquiries/*.{png,jpg,jpeg,webp}",
  {
    import: "default",
    query: {
      enhanced: true,
    },
  },
);

export const getTediumImgs = async () => {
  const loaders = Object.values(tediumImgModules);
  return Promise.all(loaders.map((loadAsset) => loadAsset()));
};

export const getArtificialInquiriesImgs = async () => {
  const loaders = Object.values(artificialInquiriesImgModules);
  return Promise.all(loaders.map((loadAsset) => loadAsset()));
};
