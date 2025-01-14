import * as server from '../entries/pages/_page.server.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.js";
export const imports = ["_app/immutable/nodes/2.DuWyYkRp.js","_app/immutable/chunks/preload-helper.BKSAkrqI.js","_app/immutable/chunks/runtime.CPZqnB3O.js","_app/immutable/chunks/disclose-version.BoeLRLwe.js","_app/immutable/chunks/legacy.BNj3VDte.js","_app/immutable/chunks/render.Bk_O1Iat.js","_app/immutable/chunks/index-client.CgKQl7V3.js"];
export const stylesheets = ["_app/immutable/assets/2.BdhUCBLg.css"];
export const fonts = [];
