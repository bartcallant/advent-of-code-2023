import {partOne} from "./part-one";

const line1 = "rn=1";
const line2 = "cm-";
const line3 = "qp=3";
const line4 = "cm=2";
const line5 = "qp-";
const line6 = "pc=4";
const line7 = "ot=9";
const line8 = "ab=5";
const line9 = "pc-,";
const line10 = "pc=6";
const line11 = "ot=7";

test.each([
	[line1, 30],
	[line2, 253],
	[line3, 97],
	[line4, 47],
	[line5, 14],
	[line6, 180],
	[line7, 9],
	[line8, 197],
	[line9, 48],
	[line10, 214],
	[line11, 231],
	[[line1, line2, line3, line4, line5, line6, line7, line8, line9, line10, line11].join(","), 1320],
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
