import {partTwo} from "./part-two";

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
	const result = partTwo(input);
	// #endregion

	// #region Then
	expect(result).toEqual(467835);
	// #endregion
});
