export const calculateScore = (map: Map<string, string>, rowLength: number, columnLength: number): number => {
	let totalScore = 0;

	for (let rowIndex = 0; rowIndex < rowLength; rowIndex++) {
		const rowScore = rowLength - rowIndex;

		for (let columnIndex = 0; columnIndex < columnLength; columnIndex++) {
			const value = map.get(`${rowIndex}-${columnIndex}`);

			if (value === undefined) {
				continue;
			}

			if (value === "." || value === "#") {
				continue;
			}

			totalScore += rowScore;
		}
	}
	return totalScore;
};
