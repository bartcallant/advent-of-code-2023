import {findGalaxies} from "./find-galaxies";
import {findRoutes} from "./find-routes";
import {parse} from "./parse";

const expand = (image: string[][]): void => {
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

	emptyRowIndexes.reverse();

	for (const newRowIndex of emptyRowIndexes) {
		const rows: string[][] = [];

		const row: string[] = [];
		for (let i = 0; i < rowLength; i++) {
			row.push(".");
		}

		rows.push(row);

		image.splice(newRowIndex, 0, ...rows);
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

	emptyColumnIndexes.reverse();

	for (const newColumIndex of emptyColumnIndexes) {
		for (const row of image) {
			row.splice(newColumIndex, 0, ".");
		}
	}
};

const findPathLengths = (routes: [[number, number], [number, number]][]): number[] => {
	const pathLengths: number[] = [];

	for (const route of routes) {
		const horizontal = route[0][0] - route[1][0];
		const vertical = route[0][1] - route[1][1];

		const length = Math.abs(horizontal) + Math.abs(vertical);

		pathLengths.push(length);
	}

	return pathLengths;
};

export const partOne = (input: string): number => {
	const image = parse(input);

	expand(image);

	const galaxies = findGalaxies(image);

	const routes = findRoutes(galaxies);

	const pathsLengths = findPathLengths(routes);

	return pathsLengths.reduce((sum, pathLength) => sum + pathLength, 0);
};
