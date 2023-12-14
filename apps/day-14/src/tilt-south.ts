export const tiltSouth = (map: Map<string, string>, rowLength: number, columnLength: number): void => {
	for (let rowIndex = rowLength - 2; rowIndex >= 0; rowIndex--) {
		for (let columnIndex = 0; columnIndex < columnLength; columnIndex++) {
			const value = map.get(`${rowIndex}-${columnIndex}`);

			if (value === undefined) {
				continue;
			}

			if (value !== "O") {
				continue;
			}

			let lastEmptyIndex = rowIndex;

			for (let i = rowIndex + 1; i < rowLength; i++) {
				const v = map.get(`${i}-${columnIndex}`);

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

			if (lastEmptyIndex === rowIndex) {
				continue;
			}

			map.set(`${lastEmptyIndex}-${columnIndex}`, value);
			map.set(`${rowIndex}-${columnIndex}`, ".");
		}
	}
};
