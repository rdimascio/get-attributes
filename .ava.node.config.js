/* eslint-disable import/no-anonymous-default-export */

export default {
	files: ["src/__tests__/index.node.test.js"],
	verbose: true,
	ignoredByWatcher: ["{coverage,examples/**"],
	require: ["esm"],
	nodeArguments: ["--experimental-modules"],
};
