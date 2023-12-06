import {partOne} from "./part-one";

test("should return correct result", () => {
	// #region Given
	const input = `Time:      7  15   30
Distance:  9  40  200`;
	// #endregion

	// #region When
	const result = partOne(input);
	// #endregion

	// #region Then
	expect(result).toEqual(288);
	// #endregion
});
