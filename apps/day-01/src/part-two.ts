const replacements = [
	["one", "1"],
	["two", "2"],
	["three", "3"],
	["four", "4"],
	["five", "5"],
	["six", "6"],
	["seven", "7"],
	["eight", "8"],
	["nine", "9"],
];

const processLine = (input: string): number => {
	const numbers: string[] = [];

	let letters = "";

	for (const character of input) {
		if (/\d/.test(character)) {
			numbers.push(character);

			continue;
		}

		letters += character;

		for (const [find, replace] of replacements) {
			if (letters.endsWith(`${find}`)) {
				numbers.push(`${replace}`);
			}
		}
	}

	const first = numbers.at(0);
	const last = numbers.at(-1);

	const stringValue = `${first}${last}`;

	return Number.parseInt(stringValue);
};

export const partTwo = (input: string): number => {
	const lines = input.split("\n");

	let result = 0;

	for (const line of lines) {
		result += processLine(line);
	}

	return result;
};
