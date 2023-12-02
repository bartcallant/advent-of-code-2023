/* eslint-disable */
export default {
	displayName: "ts",
	preset: "../../jest.preset.cjs",
	transform: {
		"^.+\\.[tj]s$": ["ts-jest", {tsconfig: "<rootDir>/tsconfig.spec.json"}],
	},
	moduleFileExtensions: ["ts", "js", "html"],
	coverageDirectory: "../../coverage/libs/ts",
};
