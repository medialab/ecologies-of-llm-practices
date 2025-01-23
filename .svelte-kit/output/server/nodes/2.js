import * as server from '../entries/pages/_page.server.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.js";
export const imports = ["_app/immutable/nodes/2.BSfWgXWL.js","_app/immutable/chunks/DQVkTNG3.js","_app/immutable/chunks/TvzOHqOS.js","_app/immutable/chunks/BR8vRMaf.js","_app/immutable/chunks/DYuR_Ejt.js","_app/immutable/chunks/CBsdMsp-.js","_app/immutable/chunks/CIkMbP8s.js"];
export const stylesheets = ["_app/immutable/assets/2.D-_jAJIq.css"];
export const fonts = [];
