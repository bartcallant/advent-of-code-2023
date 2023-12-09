export const partOne = (input: string): number => {
	const histories = input.split("\n").map((history) => history.split(" ").map((value) => Number.parseInt(value)));

	let result = 0;

	for (const history of histories) {
		const sequences: number[][] = [history];

		while (sequences.at(-1)?.some((value) => value !== 0)) {
			const lastSequence = sequences.at(-1);

			if (lastSequence === undefined) {
				break;
			}

			const newSequence: number[] = [];

			for (let i = 0; i < lastSequence.length - 1; i++) {
				const first = lastSequence[i];
				const second = lastSequence[i + 1];

				if (first === undefined || second === undefined) {
					continue;
				}

				newSequence.push(second - first);
			}

			sequences.push(newSequence);
		}

		let previousAddedValue = 0;

		for (let i = sequences.length - 1; i >= 0; i--) {
			const sequence = sequences[i];

			if (sequence === undefined) {
				continue;
			}

			const last = sequence.at(-1);

			if (last === undefined) {
				continue;
			}

			const newValue = last + previousAddedValue;

			sequence.push(newValue);
			previousAddedValue = newValue;

			if (i === 0) {
				result += newValue;
			}
		}
	}

	return result;
};
