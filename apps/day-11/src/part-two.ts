import {findGalaxies} from "./find-galaxies";
import {findRoutes} from "./find-routes";
import {parse} from "./parse";

const expand = (image: string[][]): {emptyRowIndexes: number[]; emptyColumnIndexes: number[]} => {
	const emptyRowIndexes: number[] = [];

	let rowLength = 0;

	for (let rowIndex = 0; rowIndex < image.length; rowIndex++) {
		const row = image[rowIndex];

		if (row === undefined) {
			continue;
		}

		rowLength = row.length;

		const isEmpty = row.every((value) => value === ".");

		if (isEmpty === false) {
			continue;
		}

		emptyRowIndexes.push(rowIndex);
	}

	const emptyColumnIndexes: number[] = [];

	for (let columnIndex = 0; columnIndex < rowLength; columnIndex++) {
		const columnValues: string[] = [];

		for (const row of image) {
			const column = row[columnIndex];

			if (column === undefined) {
				continue;
			}

			columnValues.push(column);
		}

		const isEmpty = columnValues.every((value) => value === ".");

		if (isEmpty === false) {
			continue;
		}

		emptyColumnIndexes.push(columnIndex);
	}

	return {
		emptyRowIndexes,
		emptyColumnIndexes,
	};
};

const findPathLengths = (
	routes: [[number, number], [number, number]][],
	emptyRowIndexes: number[],
	emptyColumnIndexes: number[],
	expander: number,
): number[] => {
	const pathLengths: number[] = [];

	for (const route of routes) {
		const horizontal = route[0][0] - route[1][0];
		const vertical = route[0][1] - route[1][1];

		const length = Math.abs(horizontal) + Math.abs(vertical);

		const xSmall = route[0][0] < route[1][0] ? route[0][0] : route[1][0];
		const xLarge = route[0][0] > route[1][0] ? route[0][0] : route[1][0];
		const ySmall = route[0][1] < route[1][1] ? route[0][1] : route[1][1];
		const yLarge = route[0][1] > route[1][1] ? route[0][1] : route[1][1];

		const passedEmptyRowIndexes = emptyRowIndexes.filter((value) => value > xSmall && value < xLarge);

		const passedEmptyColumnIndexes = emptyColumnIndexes.filter((value) => value > ySmall && value < yLarge);

		const xAdder = passedEmptyRowIndexes.length * (expander - 1);
		const yAdder = passedEmptyColumnIndexes.length * (expander - 1);

		pathLengths.push(length + xAdder + yAdder);
	}

	return pathLengths;
};

export const partTwo = (input: string, expander: number): number => {
	const image = parse(input);

	const {emptyRowIndexes, emptyColumnIndexes} = expand(image);

	const galaxies = findGalaxies(image);

	const routes = findRoutes(galaxies);

	const pathsLengths = findPathLengths(routes, emptyRowIndexes, emptyColumnIndexes, expander);

	return pathsLengths.reduce((sum, pathLength) => sum + pathLength, 0);
};
