export const parse = (input: string): {map: Map<string, string>; rowLength: number; columnLength: number} => {
	const rows = input.split("\n");

	const map = new Map<string, string>();
	const rowLength = rows.length;
	const columnLength = rows[0]?.length ?? 0;

	for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
		const row = rows[rowIndex];

		if (row === undefined) {
			continue;
		}

		for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
			const value = row[columnIndex];

			if (value === undefined) {
				continue;
			}

			map.set(`${rowIndex}-${columnIndex}`, value);
		}
	}

	return {
		map,
		rowLength,
		columnLength,
	};
};
