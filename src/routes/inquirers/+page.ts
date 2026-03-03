/** @type {import('./$types').PageLoad} */
import { inquirers } from "$database/global_db";

export function load({ params }) {
  return {
    inquirers: Object.values(inquirers),
  };
}
