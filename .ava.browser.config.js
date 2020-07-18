/* eslint-disable import/no-anonymous-default-export */

export default {
	files: ["src/__tests__/index.test.js"],
	verbose: true,
	ignoredByWatcher: ["{coverage,examples/**"],
	require: ["esm", "./src/__tests__/_setup-browser-env.js"],
	nodeArguments: ["--experimental-modules"],
};
