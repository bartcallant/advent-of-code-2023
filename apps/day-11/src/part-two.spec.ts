import {partTwo} from "./part-two";

test.each([
	[2, 374],
	[10, 1030],
	[100, 8410],
])("should return correct result for %s", (expander, expectedResult) => {
	// #region Given
	const input = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`;
	// #endregion

	// #region When
	const result = partTwo(input, expander);
	// #endregion

	// #region Then
	expect(result).toEqual(expectedResult);
	// #endregion
});
