/** @type {import('./$types').PageLoad} */
import { tediumData } from "$database/global_db";
import { getTediumImgs } from "$database/media";

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
