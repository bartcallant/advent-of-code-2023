const processLine = (input: string): number => {
	const characters = input.split("");

	const numbers = characters.filter((character) => /\d/.test(character));

	const first = numbers.at(0);
	const last = numbers.at(-1);

	const stringValue = `${first}${last}`;

	return Number.parseInt(stringValue);
};

export const partOne = (input: string): number => {
	const lines = input.split("\n");

	let result = 0;

	for (const line of lines) {
		result += processLine(line);
	}

	return result;
};
