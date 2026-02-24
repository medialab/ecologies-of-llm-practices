/** @type {import('./$types').PageLoad} */
import { tediumData } from "$database/global_db.js";
import { getTediumImgs } from "$database/media.js";

export async function load() {
  const media = await getTediumImgs();

  return {
    title: tediumData.About.Title,
    subtitle: tediumData.About.Subtitle,
    description: tediumData.About.Description,
    SubDescription: tediumData.About.SubDescription,
    media,
  };
}
