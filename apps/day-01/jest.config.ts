/* eslint-disable */
export default {
	displayName: "day-01",
	preset: "../../jest.preset.cjs",
	testEnvironment: "node",
	transform: {
		"^.+\\.[tj]s$": ["ts-jest", {tsconfig: "<rootDir>/tsconfig.spec.json", useESM: true}],
	},
	moduleFileExtensions: ["ts", "js", "html"],
	coverageDirectory: "../../coverage/apps/day-01",
};
