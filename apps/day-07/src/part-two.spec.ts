import {partTwo} from "./part-two";

test("should return correct result", () => {
	// #region Given
	const input = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;
	// #endregion

	// #region When
	const result = partTwo(input);
	// #endregion

	// #region Then
	expect(result).toEqual(5905);
	// #endregion
});
