import {partOne} from "./part-one";

const line1 = "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green";
const line2 = "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue";
const line3 = "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red";
const line4 = "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red";
const line5 = "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green";

test.each([
	[line1, 1],
	[line2, 2],
	[line3, 0],
	[line4, 0],
	[line5, 5],
	[[line1, line2, line3, line4, line5].join("\n"), 8],
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
