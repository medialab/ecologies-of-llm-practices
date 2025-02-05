

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.Ban879rF.js","_app/immutable/chunks/5sUcMebz.js","_app/immutable/chunks/BwgY_nFc.js"];
export const stylesheets = [];
export const fonts = [];
