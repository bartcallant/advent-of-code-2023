export const findGalaxies = (image: string[][]): [number, number][] => {
	const galaxies: [number, number][] = [];

	for (let rowIndex = 0; rowIndex < image.length; rowIndex++) {
		const row = image[rowIndex];

		if (row === undefined) {
			continue;
		}

		for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
			const value = row[columnIndex];

			if (value === undefined) {
				continue;
			}

			if (value === ".") {
				continue;
			}

			galaxies.push([rowIndex, columnIndex]);
		}
	}

	return galaxies;
};
