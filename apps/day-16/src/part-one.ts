import {calculateNumberOfEnergizedTiles} from "./calculate-number-of-energized-tiles";
import {parse} from "./parse";

export const partOne = (input: string): number => {
	const map = parse(input);

	return calculateNumberOfEnergizedTiles(map, {position: [0, 0], direction: "right"});
};
