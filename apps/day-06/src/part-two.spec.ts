import {partTwo} from "./part-two";

test("should return correct result", () => {
	// #region Given
	const input = `Time:      7  15   30
Distance:  9  40  200`;
	// #endregion

	// #region When
	const result = partTwo(input);
	// #endregion

	// #region Then
	expect(result).toEqual(71503);
	// #endregion
});
