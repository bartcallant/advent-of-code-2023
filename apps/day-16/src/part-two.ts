import {calculateNumberOfEnergizedTiles} from "./calculate-number-of-energized-tiles";
import {parse} from "./parse";

export const partTwo = (input: string): number => {
	const map = parse(input);

	const maxX = input.split("\n").length - 1;
	const maxY = (input.split("\n")[0]?.length ?? 0) - 1;

	const results: number[] = [];

	for (let y = 0; y < maxY; y++) {
		results.push(calculateNumberOfEnergizedTiles(map, {position: [0, y], direction: "down"}));
		results.push(calculateNumberOfEnergizedTiles(map, {position: [maxX, y], direction: "up"}));
	}

	for (let x = 0; x < maxX; x++) {
		results.push(calculateNumberOfEnergizedTiles(map, {position: [x, 0], direction: "right"}));
		results.push(calculateNumberOfEnergizedTiles(map, {position: [x, maxY], direction: "left"}));
	}

	return results.reduce((highest, current) => (current > highest ? current : highest), 0);
};
