/** @type {import('./$types').PageLoad} */
import { tediumData } from "$database/global_db.js";
import { tediumImgs } from "$database/media.js";

export function load() {
  return {
    title: tediumData.About.Title,
    subtitle: tediumData.About.Subtitle,
    description: tediumData.About.Description,
    media: tediumImgs,
  };
}
