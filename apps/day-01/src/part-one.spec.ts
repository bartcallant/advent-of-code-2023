import {partOne} from "./part-one";

const line1 = "1abc2";
const line2 = "pqr3stu8vwx";
const line3 = "a1b2c3d4e5f";
const line4 = "treb7uchet";

test.each([
	[line1, 12],
	[line2, 38],
	[line3, 15],
	[line4, 77],
	[[line1, line2, line3, line4].join("\n"), 142],
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
