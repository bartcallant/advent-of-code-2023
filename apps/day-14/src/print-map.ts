export const printMap = (map: Map<string, string>, rowLength: number, columnLength: number): void => {
	const rows: string[] = [];

	for (let rowIndex = 0; rowIndex < rowLength; rowIndex++) {
		const row: string[] = [];

		for (let columnIndex = 0; columnIndex < columnLength; columnIndex++) {
			const value = map.get(`${rowIndex}-${columnIndex}`);

			if (value === undefined) {
				continue;
			}

			row.push(value);
		}

		rows.push(row.join(""));
	}

	console.log(rows.join("\n"));
};
