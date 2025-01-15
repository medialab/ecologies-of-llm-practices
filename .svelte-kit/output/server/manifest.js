export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "EL2MP/_app",
	assets: new Set(["favicon.png","styles/styles.css","styles/variables.css"]),
	mimeTypes: {".png":"image/png",".css":"text/css"},
	_: {
		client: {"start":"_app/immutable/entry/start.C80oejCr.js","app":"_app/immutable/entry/app.D6PqnR_n.js","imports":["_app/immutable/entry/start.C80oejCr.js","_app/immutable/chunks/entry.CJIKWtdM.js","_app/immutable/chunks/runtime.CPZqnB3O.js","_app/immutable/chunks/index-client.CgKQl7V3.js","_app/immutable/entry/app.D6PqnR_n.js","_app/immutable/chunks/preload-helper.BKSAkrqI.js","_app/immutable/chunks/runtime.CPZqnB3O.js","_app/immutable/chunks/render.Bk_O1Iat.js","_app/immutable/chunks/disclose-version.BoeLRLwe.js","_app/immutable/chunks/index-client.CgKQl7V3.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
