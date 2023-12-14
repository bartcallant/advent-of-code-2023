import {calculateScore} from "./calculate-score";
import {parse} from "./parse";
import {tiltNorth} from "./tilt-north";

export const partOne = (input: string): number => {
	const {map, rowLength, columnLength} = parse(input);

	tiltNorth(map, rowLength, columnLength);

	return calculateScore(map, rowLength, columnLength);
};
