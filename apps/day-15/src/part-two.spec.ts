import {partTwo} from "./part-two";

test("should return correct result", () => {
	// #region Given
	const input = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`;
	// #endregion

	// #region When
	const result = partTwo(input);
	// #endregion

	// #region Then
	expect(result).toEqual(145);
	// #endregion
});
