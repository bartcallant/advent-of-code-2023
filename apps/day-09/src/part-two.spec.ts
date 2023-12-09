import {partTwo} from "./part-two";

const line1 = "0 3 6 9 12 15";
const line2 = "1 3 6 10 15 21";
const line3 = "10 13 16 21 30 45";

test.each([
	[line1, -3],
	[line2, 0],
	[line3, 5],
	[[line1, line2, line3].join("\n"), 2],
])("should return correct result for %s", (line, expectedResult) => {
	// #region Given
	const input = line;
	// #endregion

	// #region When
	const result = partTwo(input);
	// #endregion

	// #region Then
	expect(result).toEqual(expectedResult);
	// #endregion
});
