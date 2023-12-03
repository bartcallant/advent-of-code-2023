const findAdjacentNumberIndexes = ({
	matrix,
	rowIndex,
	columnIndex,
}: {
	matrix: string[][];
	rowIndex: number;
	columnIndex: number;
}): number[][] => {
	const rowLength = matrix[rowIndex]?.length ?? 0;

	const startRowIndex = rowIndex === 0 ? rowIndex : rowIndex - 1;
	const endRowIndex = rowIndex === matrix.length - 1 ? rowIndex : rowIndex + 1;
	const startColumnIndex = columnIndex === 0 ? 0 : columnIndex - 1;
	const endColumnIndex = columnIndex + 1 > rowLength ? rowLength : columnIndex + 1;

	const adjacentNumbersIndexes: number[][] = [];

	for (let checkRowIndex = startRowIndex; checkRowIndex <= endRowIndex; checkRowIndex++) {
		let previousIndexWasAlsoNumber = false;

		for (let checkColumnIndex = startColumnIndex; checkColumnIndex <= endColumnIndex; checkColumnIndex++) {
			const checkValue = matrix[checkRowIndex]?.[checkColumnIndex];

			if (checkValue === undefined) {
				previousIndexWasAlsoNumber = false;
				continue;
			}

			if (!/\d/.test(checkValue)) {
				previousIndexWasAlsoNumber = false;

				continue;
			}

			if (previousIndexWasAlsoNumber) {
				continue;
			}

			adjacentNumbersIndexes.push([checkRowIndex, checkColumnIndex]);
			previousIndexWasAlsoNumber = true;
		}
	}

	return adjacentNumbersIndexes;
};

const findNumberBasedOnIndex = ({
	matrix,
	rowIndex,
	columnindex,
}: {
	matrix: string[][];
	rowIndex: number;
	columnindex: number;
}): number => {
	const row = matrix[rowIndex];

	if (row === undefined) {
		return 0;
	}

	const stringValues: string[] = [];

	const beforeStartIndex = columnindex < 1 ? 0 : columnindex - 1;
	const beforeEndIndex = 0;

	for (let i = beforeStartIndex; i >= beforeEndIndex; i--) {
		const value = row[i];

		if (value === undefined) {
			continue;
		}

		if (!/\d/.test(value)) {
			break;
		}

		stringValues.push(value);
	}

	stringValues.reverse();

	const indexValue = row[columnindex];

	if (indexValue !== undefined) {
		stringValues.push(indexValue);
	}

	const afterStartIndex = columnindex + 1 === row.length - 1 ? row.length - 1 : columnindex + 1;
	const afterEndIndex = row.length - 1;

	for (let i = afterStartIndex; i <= afterEndIndex; i++) {
		const value = row[i];

		if (value === undefined) {
			continue;
		}

		if (!/\d/.test(value)) {
			break;
		}

		stringValues.push(value);
	}

	return Number.parseInt(stringValues.join("")) || 0;
};

export const partTwo = (input: string): number => {
	const matrix: string[][] = [];

	for (const line of input.split("\n")) {
		matrix.push(line.split(""));
	}

	const gearRatios: number[] = [];

	for (const [rowIndex, rowValue] of matrix.entries()) {
		for (const [columnIndex, columnValue] of rowValue.entries()) {
			if (columnValue !== "*") {
				continue;
			}

			const adjacentNumbersIndexes = findAdjacentNumberIndexes({matrix, rowIndex, columnIndex});

			if (adjacentNumbersIndexes.length < 2) {
				continue;
			}

			const adjacentNumbers = adjacentNumbersIndexes.map(([ri, ci]) =>
				findNumberBasedOnIndex({matrix, rowIndex: ri ?? 0, columnindex: ci ?? 0}),
			);

			const gearRatio = adjacentNumbers.reduce((result, gear) => result * gear, 1);

			gearRatios.push(gearRatio);
		}
	}

	return gearRatios.reduce((sum, currentValue) => sum + currentValue, 0);
};
