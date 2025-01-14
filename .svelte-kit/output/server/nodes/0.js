

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.C6DpWnHH.js","_app/immutable/chunks/disclose-version.BoeLRLwe.js","_app/immutable/chunks/runtime.CPZqnB3O.js"];
export const stylesheets = [];
export const fonts = [];
