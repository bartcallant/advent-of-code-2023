import {parseLineToGame} from "./parse-line-to-game";

const processLine = (input: string): number => {
	const game = parseLineToGame(input);

	let maxBlue = 0;
	let maxGreen = 0;
	let maxRed = 0;

	for (const set of game.sets) {
		if (set.blue !== undefined && set.blue > maxBlue) {
			maxBlue = set.blue;
		}

		if (set.green !== undefined && set.green > maxGreen) {
			maxGreen = set.green;
		}

		if (set.red !== undefined && set.red > maxRed) {
			maxRed = set.red;
		}
	}

	return maxBlue * maxGreen * maxRed;
};

export const partTwo = (input: string): number => {
	const games = input.split("\n");

	let result = 0;

	for (const game of games) {
		result += processLine(game);
	}

	return result;
};
