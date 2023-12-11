export const parse = (input: string): string[][] => {
	const result: string[][] = [];

	for (const line of input.split("\n")) {
		result.push(line.split(""));
	}

	return result;
};
