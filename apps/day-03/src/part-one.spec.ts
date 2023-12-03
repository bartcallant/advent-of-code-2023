import {partOne} from "./part-one";

test("should return correct result", () => {
	// #region Given
	const input = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;
	// #endregion

	// #region When
	const result = partOne(input);
	// #endregion

	// #region Then
	expect(result).toEqual(4361);
	// #endregion
});
