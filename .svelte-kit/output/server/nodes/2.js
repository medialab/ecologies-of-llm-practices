import * as server from '../entries/pages/_page.server.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.js";
export const imports = ["_app/immutable/nodes/2.CKS8QaaK.js","_app/immutable/chunks/M9VrSIoH.js","_app/immutable/chunks/BwgY_nFc.js","_app/immutable/chunks/5sUcMebz.js","_app/immutable/chunks/Ds-iUD5l.js","_app/immutable/chunks/Dsfgde4Q.js","_app/immutable/chunks/CN-nOJ80.js"];
export const stylesheets = ["_app/immutable/assets/2.FwmHSLaM.css"];
export const fonts = [];
