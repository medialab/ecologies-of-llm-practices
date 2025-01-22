

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.C7-v_w1o.js","_app/immutable/chunks/BR8vRMaf.js","_app/immutable/chunks/TvzOHqOS.js"];
export const stylesheets = [];
export const fonts = [];
