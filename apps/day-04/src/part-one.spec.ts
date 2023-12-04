import {partOne} from "./part-one";

const line1 = "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53";
const line2 = "Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19";
const line3 = "Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1";
const line4 = "Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83";
const line5 = "Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36";
const line6 = "Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11";

test.each([
	[line1, 8],
	[line2, 2],
	[line3, 2],
	[line4, 1],
	[line5, 0],
	[line6, 0],
	[[line1, line2, line3, line4, line5, line6].join("\n"), 13],
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
