import {parseNetwork} from "./parser";

export const partOne = (input: string): number => {
	const network = parseNetwork(input);

	const start = "AAA";
	const end = "ZZZ";

	let current = start;
	let stepCounter = 0;

	while (current !== end) {
		for (const direction of network.directions) {
			const currentNode = network.nodes.get(current);

			if (currentNode === undefined) {
				continue;
			}

			stepCounter++;

			if (direction === "L") {
				current = currentNode[0];
			} else if (direction === "R") {
				current = currentNode[1];
			}
		}
	}

	return stepCounter;
};
