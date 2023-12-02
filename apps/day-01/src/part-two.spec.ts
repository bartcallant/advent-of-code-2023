import {partTwo} from "./part-two";

const line1 = "two1nine";
const line2 = "eightwothree";
const line3 = "abcone2threexyz";
const line4 = "xtwone3four";
const line5 = "4nineeightseven2";
const line6 = "zoneight234";
const line7 = "7pqrstsixteen";

test.each([
	[line1, 29],
	[line2, 83],
	[line3, 13],
	[line4, 24],
	[line5, 42],
	[line6, 14],
	[line7, 76],
	[[line1, line2, line3, line4, line5, line6, line7].join("\n"), 281],
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
