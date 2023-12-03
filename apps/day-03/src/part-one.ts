const isNumberAdjecentToSymbol = ({
	matrix,
	rowIndex,
	lastColumnIndex,
	value,
}: {
	matrix: string[][];
	rowIndex: number;
	lastColumnIndex: number;
	value: string;
}): boolean => {
	const startRowIndex = rowIndex === 0 ? rowIndex : rowIndex - 1;
	const endRowIndex = rowIndex === matrix.length - 1 ? rowIndex : rowIndex + 1;
	const startColumnIndex = lastColumnIndex - value.length < 0 ? 0 : lastColumnIndex - value.length;
	const endCOlumnIndex =
		lastColumnIndex > (matrix[0]?.length ?? 0 - 1) ? matrix[0]?.length ?? 0 : lastColumnIndex + 1;

	for (let checkRowIndex = startRowIndex; checkRowIndex <= endRowIndex; checkRowIndex++) {
		for (let checkColumnIndex = startColumnIndex; checkColumnIndex <= endCOlumnIndex; checkColumnIndex++) {
			const value = matrix[checkRowIndex]?.[checkColumnIndex];

			if (value === undefined) {
				continue;
			}

			if (/\d/.test(value)) {
				continue;
			}

			if (value === ".") {
				continue;
			}

			return true;
		}
	}

	return false;
};

export const partOne = (input: string): number => {
	const matrix: string[][] = [];

	for (const line of input.split("\n")) {
		matrix.push(line.split(""));
	}

	const ValidNumbers: string[] = [];

	for (const [rowIndex, rowValue] of matrix.entries()) {
		let totalNumber = "";

		for (const [columnIndex, columnValue] of rowValue.entries()) {
			if (!/\d/.test(columnValue)) {
				if (totalNumber !== "") {
					if (
						isNumberAdjecentToSymbol({
							matrix,
							rowIndex,
							lastColumnIndex: columnIndex - 1,
							value: totalNumber,
						})
					) {
						ValidNumbers.push(totalNumber);
					}

					totalNumber = "";
				}

				continue;
			}

			totalNumber += columnValue;
		}

		if (totalNumber !== "") {
			if (
				isNumberAdjecentToSymbol({matrix, rowIndex, lastColumnIndex: rowValue.length - 1, value: totalNumber})
			) {
				ValidNumbers.push(totalNumber);
			}
		}
	}

	return ValidNumbers.reduce((sum, currentValue) => sum + Number.parseInt(currentValue), 0);
};
