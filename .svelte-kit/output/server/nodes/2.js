import * as server from '../entries/pages/_page.server.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.js";
export const imports = ["_app/immutable/nodes/2.5w-l0oTZ.js","_app/immutable/chunks/DvSL3Juj.js","_app/immutable/chunks/BBEvxwgZ.js","_app/immutable/chunks/BuYxUJmY.js","_app/immutable/chunks/CuIbsRnG.js","_app/immutable/chunks/LWny8Un0.js","_app/immutable/chunks/SgB2kTJX.js"];
export const stylesheets = ["_app/immutable/assets/2.PgcnIpP0.css"];
export const fonts = [];
