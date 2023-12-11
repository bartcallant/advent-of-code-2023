const parseMap = (input: string): string[][] => {
	const lines = input.split("\n");

	const result: string[][] = [];

	for (const line of lines) {
		result.push(line.split(""));
	}

	return result;
};

const findStartingPosition = (map: string[][]): [number, number] | undefined => {
	for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {
		const row = map[rowIndex];

		if (row === undefined) {
			continue;
		}

		for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
			const column = row[columnIndex];

			if (column === undefined) {
				continue;
			}

			if (column === "S") {
				return [rowIndex, columnIndex];
			}
		}
	}

	return undefined;
};

const setValueForPosition = (map: string[][], position: [number, number], value: string): void => {
	const [positionRowIndex, positionColumnIndex] = position;

	const row = map[positionRowIndex];

	if (row === undefined) {
		return;
	}

	row[positionColumnIndex] = value;
};

const replaceStartingPosition = (map: string[][], startingPosition: [number, number]): void => {
	setValueForPosition(map, startingPosition, "F");
};

const calculateLongestDistance = (map: string[][], startingPosition: [number, number]): number => {
	const cleanedMap: string[][] = [];

	for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {
		const row = map[rowIndex];

		if (row === undefined) {
			continue;
		}

		const cleanRow = [];

		for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
			if (rowIndex === startingPosition[0] && columnIndex === startingPosition[1]) {
				cleanRow.push("F");

				continue;
			}

			cleanRow.push(".");
		}

		cleanedMap.push(cleanRow);
	}

	let iteration = 0;
	let currentPosition: [number, number] | undefined = undefined;
	const visitedPositions = new Set<string>();

	while (currentPosition !== startingPosition) {
		iteration++;

		if (currentPosition === undefined) {
			currentPosition = startingPosition;
		}

		const currentValue = map[currentPosition[0]]?.[currentPosition[1]];

		if (currentValue === undefined) {
			// console.log("No currentValue found for currentPosition", currentPosition);

			break;
		}

		const nextPositions: [number, number][] = [];

		if (currentValue === "|") {
			// | is a vertical pipe connecting north and south.
			nextPositions.push([currentPosition[0] - 1, currentPosition[1]]);
			nextPositions.push([currentPosition[0] + 1, currentPosition[1]]);
		} else if (currentValue === "-") {
			// - is a horizontal pipe connecting east and west.
			nextPositions.push([currentPosition[0], currentPosition[1] + 1]);
			nextPositions.push([currentPosition[0], currentPosition[1] - 1]);
		} else if (currentValue === "L") {
			// L is a 90-degree bend connecting north and east.
			nextPositions.push([currentPosition[0] - 1, currentPosition[1]]);
			nextPositions.push([currentPosition[0], currentPosition[1] + 1]);
		} else if (currentValue === "J") {
			// J is a 90-degree bend connecting north and west.
			nextPositions.push([currentPosition[0] - 1, currentPosition[1]]);
			nextPositions.push([currentPosition[0], currentPosition[1] - 1]);
		} else if (currentValue === "7") {
			// 7 is a 90-degree bend connecting south and west.
			nextPositions.push([currentPosition[0] + 1, currentPosition[1]]);
			nextPositions.push([currentPosition[0], currentPosition[1] - 1]);
		} else if (currentValue === "F") {
			// F is a 90-degree bend connecting south and east.
			nextPositions.push([currentPosition[0] + 1, currentPosition[1]]);
			nextPositions.push([currentPosition[0], currentPosition[1] + 1]);
		}

		visitedPositions.add(`${currentPosition[0]}-${currentPosition[1]}`);

		const nonVisitedNextPositions = nextPositions.filter(
			(position) => !visitedPositions.has(`${position[0]}-${position[1]}`),
		);

		setValueForPosition(cleanedMap, currentPosition, currentValue);

		if (nonVisitedNextPositions.length === 0) {
			// console.log("No non visited next positions found", iteration);

			break;
		}

		currentPosition = nonVisitedNextPositions[0];
	}

	return iteration / 2;
};

export const partOne = (input: string): number => {
	const map = parseMap(input);
	const startingPosition = findStartingPosition(map);

	if (startingPosition === undefined) {
		return 0;
	}

	replaceStartingPosition(map, startingPosition);

	return calculateLongestDistance(map, startingPosition);
};
