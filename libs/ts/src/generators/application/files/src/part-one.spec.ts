import {partOne} from "./part-one";

const line1 = "";
const line2 = "";

test.each([
	[line1, 0],
	[line2, 0],
	[[line1, line2].join("\n"), 0],
])("should return correct result for %s", (line, expectedResult) => {
	// #region Given
	const input = line;
	// #endregion

	// #region When
	const result = partOne(input);
	// #endregion

	// #region Then
	expect(result).toEqual(expectedResult);
	// #endregion
});
