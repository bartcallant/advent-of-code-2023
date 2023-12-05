/* eslint-disable */
export default {
	displayName: "day-05",
	preset: "../../jest.preset.cjs",
	testEnvironment: "node",
	transform: {
		"^.+\\.[tj]s$": ["ts-jest", {tsconfig: "<rootDir>/tsconfig.spec.json"}],
	},
	moduleFileExtensions: ["ts", "js", "html"],
	coverageDirectory: "../../coverage/apps/day-05",
};
