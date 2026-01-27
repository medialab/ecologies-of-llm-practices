/* THIS IS PAGE.SERVER.JS */
/** @type {import('./$types').PageLoad} */

export const prerender = true;
export const trailingSlash = "always";

import backgroundImage from "$media/logos/Dot_background.png?enhanced";

import { general } from "$database/config.js";

import { cardsDb, floatersDb, alterEgosDb } from "$database/global_db.js";

export function load() {
  return {
    backgroundImage,
    logoImage: general.logoImage,
    cardsDb,
    floatersDb,
    alterEgosDb,
    condensed_logo: general.condensed_logo,
    condensed_logo_white: general.condensed_logo_white,
  };
}
