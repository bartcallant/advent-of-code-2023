interface GameSet {
	blue?: number | undefined;
	green?: number | undefined;
	red?: number | undefined;
}

interface Game {
	id: number;
	sets: GameSet[];
}

export const parseLineToGame = (input: string): Game => {
	const [info, setsString] = input.split(": ");

	const id = Number.parseInt(info?.replace("Game ", "") ?? "");

	const sets: GameSet[] = [];

	for (const setString of setsString?.split("; ") ?? []) {
		const cubes = setString.split(", ");

		const set: GameSet = {};

		for (const cube of cubes) {
			const [countString, color] = cube.split(" ");

			const count = Number.parseInt(`${countString}`);

			if (color === "blue") {
				set.blue = count;
			} else if (color === "green") {
				set.green = count;
			} else if (color === "red") {
				set.red = count;
			}
		}

		sets.push(set);
	}

	return {
		id,
		sets,
	};
};
