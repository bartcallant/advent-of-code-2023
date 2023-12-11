import {partOne} from "./part-one";

test.each([
	[
		`-L|F7
7S-7|
L|7||
-L-J|
L|-JF`,
		4,
	],
	[
		`7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ`,
		8,
	],
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
