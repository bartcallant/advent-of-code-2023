export const tiltWest = (map: Map<string, string>, rowLength: number, columnLength: number): void => {
	for (let rowIndex = 0; rowIndex < rowLength; rowIndex++) {
		for (let columnIndex = 1; columnIndex < columnLength; columnIndex++) {
			const value = map.get(`${rowIndex}-${columnIndex}`);

			if (value === undefined) {
				continue;
			}

			if (value !== "O") {
				continue;
			}

			let lastEmptyIndex = columnIndex;

			for (let i = columnIndex - 1; i >= 0; i--) {
				const v = map.get(`${rowIndex}-${i}`);

				if (v === undefined) {
					continue;
				}

				if (v === "#") {
					break;
				}

				if (v === "O") {
					break;
				}

				if (v === ".") {
					lastEmptyIndex = i;

					continue;
				}
			}

			if (lastEmptyIndex === columnIndex) {
				continue;
			}

			map.set(`${rowIndex}-${lastEmptyIndex}`, value);
			map.set(`${rowIndex}-${columnIndex}`, ".");
		}
	}
};
