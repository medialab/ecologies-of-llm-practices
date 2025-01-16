

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.DJy4YAZu.js","_app/immutable/chunks/disclose-version.yRUqBdr1.js","_app/immutable/chunks/runtime.CPZqnB3O.js"];
export const stylesheets = [];
export const fonts = [];
