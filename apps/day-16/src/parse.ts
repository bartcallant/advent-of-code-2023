export const parse = (input: string): Map<string, string> => {
	const map = new Map<string, string>();

	const rows = input.split("\n");

	for (let x = 0; x < rows.length; x++) {
		const row = rows[x];

		if (row === undefined) {
			continue;
		}

		for (let y = 0; y < row.length; y++) {
			const value = row[y];

			if (value === undefined) {
				continue;
			}

			map.set(`${x}-${y}`, value);
		}
	}

	return map;
};
