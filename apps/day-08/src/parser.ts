interface Network {
	directions: string[];
	nodes: Map<string, [string, string]>;
}

export const parseNetwork = (input: string): Network => {
	const [directionsString, nodesString] = input.split("\n\n");

	const directions = directionsString?.split("") ?? [];

	const nodes = new Map<string, [string, string]>();

	for (const nodeString of nodesString?.split("\n") ?? []) {
		const [start, nextString] = nodeString.split(" = ");

		if (start === undefined) {
			continue;
		}

		const cleanedNextString = nextString?.replace("(", "").replace(")", "");

		const [left, right] = cleanedNextString?.split(", ") ?? [];

		if (left === undefined || right === undefined) {
			continue;
		}

		nodes.set(start, [left, right]);
	}

	return {
		directions,
		nodes,
	};
};
