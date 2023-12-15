import {hash} from "./hash";

const parse = (input: string): string[][] => {
	const result: string[][] = [];

	for (const sequence of input.split(",")) {
		result.push(sequence.split(""));
	}

	return result;
};

export const partOne = (input: string): number => {
	const sequences = parse(input);

	let totalValue = 0;

	for (const sequence of sequences) {
		totalValue += hash(sequence);
	}

	return totalValue;
};
