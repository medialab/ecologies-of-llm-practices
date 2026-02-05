/** @type {import('./$types').PageLoad} */
import { datapolicyData } from "$database/global_db.js";

export function load() {
  return {
    title: datapolicyData.About.Title,
    subtitle: datapolicyData.About.Subtitle,
    description: datapolicyData.About.Description,
    media: [],
  };
}
