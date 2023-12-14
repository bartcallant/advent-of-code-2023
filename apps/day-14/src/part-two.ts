import {calculateScore} from "./calculate-score";
import {parse} from "./parse";
import {tiltWest} from "./tilt-west";
import {tiltNorth} from "./tilt-north";
import {tiltSouth} from "./tilt-south";
import {tiltEast} from "./tilt-east";

export const partTwo = (input: string): number => {
	const {map, rowLength, columnLength} = parse(input);

	for (let i = 0; i < 1000000000; i++) {
		tiltNorth(map, rowLength, columnLength);

		tiltWest(map, rowLength, columnLength);

		tiltSouth(map, rowLength, columnLength);

		tiltEast(map, rowLength, columnLength);
	}

	return calculateScore(map, rowLength, columnLength);
};
