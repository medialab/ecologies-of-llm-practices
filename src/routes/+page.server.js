/* THIS IS PAGE.SERVER.JS */
/** @type {import('./$types').PageLoad} */

export const prerender = true;
export const trailingSlash = "always";

import { mergeAlias } from "vite";
import { id } from "date-fns/locale";
import {
  cardsDb,
  floatersDb,
  circle_logo,
  condensed_logo,
  enhanced_logoImage,
  logoImage,
  projectDescription,
} from "$database/global_db.js";
import backgroundImage from "$media/Dot_background.png?enhanced";

export function load({ params }) {
  return {
    backgroundImage,
    logoImage,
    cardsDb,
    floatersDb,
    projectDescription,
    condensed_logo,
  };
}
