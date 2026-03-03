/* THIS IS PAGE.SERVER.JS */
/** @type {import('./$types').PageLoad} */

export const prerender = true;

import backgroundImage from "$media/logos/Dot_background.png?enhanced";
import logoImage from "$lib/media/logos/logo_complete.svg";
import condensed_logo from "$lib/media/logos/logo_condensed.svg";
import condensed_logo_white from "$lib/media/logos/logo_condensed_white.svg";
import { cardsDb, floatersDb, alterEgosDb } from "$database/global_db";

export function load() {
  return {
    backgroundImage,
    logoImage,
    condensed_logo,
    condensed_logo_white,
    cardsDb,
    floatersDb,
    alterEgosDb,
  };
}
