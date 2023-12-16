import {partTwo} from "./part-two";

test("should return correct result", () => {
	// #region Given
	const input = `.|...\\....
|.-.\\.....
.....|-...
........|.
..........
.........\\
..../.\\\\..
.-.-/..|..
.|....-|.\\
..//.|....`;
	// #endregion

	// #region When
	const result = partTwo(input);
	// #endregion

	// #region Then
	expect(result).toEqual(51);
	// #endregion
});
