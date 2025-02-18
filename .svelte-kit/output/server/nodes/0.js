

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.CNIiEkAZ.js","_app/immutable/chunks/BuYxUJmY.js","_app/immutable/chunks/BBEvxwgZ.js"];
export const stylesheets = [];
export const fonts = [];
