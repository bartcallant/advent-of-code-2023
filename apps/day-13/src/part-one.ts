const buildColumnListForPattern = (pattern: string[]): string[] => {
	const length = pattern[0]?.length ?? 0;
	const columns: string[] = [];

	for (let columnIndex = 0; columnIndex < length; columnIndex++) {
		const column: string[] = [];

		for (let rowIndex = 0; rowIndex < pattern.length; rowIndex++) {
			const row = pattern[rowIndex];

			if (row === undefined) {
				continue;
			}

			const columnValue = row[columnIndex];

			if (columnValue === undefined) {
				continue;
			}

			column.push(columnValue);
		}

		columns.push(column.join(""));
	}

	return columns;
};

const findFirstEqualIndexes = (pattern: string[]): number[] => {
	const firstEqualIndexes: number[] = [];

	for (let i = 0; i <= pattern.length - 1; i++) {
		const current = pattern[i];
		const next = pattern[i + 1];

		if (current === undefined || next === undefined) {
			continue;
		}

		if (current !== next) {
			continue;
		}

		firstEqualIndexes.push(i);
	}

	return firstEqualIndexes;
};

const calculateMirrorIndex = (pattern: string[]): number => {
	const firstEqualIndexes = findFirstEqualIndexes(pattern);

	for (const firstEqualIndex of firstEqualIndexes) {
		for (let i = 0; i < pattern.length; i++) {
			const currentIndex = firstEqualIndex - i;
			const nextIndex = firstEqualIndex + (i + 1);

			const current = pattern[currentIndex];
			const next = pattern[nextIndex];

			if (current === next) {
				continue;
			}

			if (current === undefined && currentIndex === -1) {
				return firstEqualIndex + 1;
			}

			if (next === undefined && nextIndex === pattern.length) {
				return firstEqualIndex + 1;
			}

			break;
		}
	}

	return 0;
};

export const partOne = (input: string): number => {
	const patterns = input.split("\n\n").map((line) => line.split("\n"));

	let result = 0;

	for (let index = 0; index < patterns.length; index++) {
		const pattern = patterns[index];

		if (pattern === undefined) {
			continue;
		}

		const horizontalResult = calculateMirrorIndex(pattern);

		if (horizontalResult !== 0) {
			result += horizontalResult * 100;

			continue;
		}

		const verticalResult = calculateMirrorIndex(buildColumnListForPattern(pattern));

		if (verticalResult !== 0) {
			result += verticalResult;

			continue;
		}
	}

	return result;
};
