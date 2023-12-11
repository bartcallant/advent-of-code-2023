import {partOne} from "./part-one";

test("should return correct result", () => {
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
	const result = partOne(input);
	// #endregion

	// #region Then
	expect(result).toEqual(374);
	// #endregion
});
