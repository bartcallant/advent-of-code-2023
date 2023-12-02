import {parseLineToGame} from "./parse-line-to-game";

const processLine = (input: string): number => {
	const game = parseLineToGame(input);

	const maxBlue = 14;
	const maxGreen = 13;
	const maxRed = 12;

	for (const set of game.sets) {
		if (set.blue !== undefined && set.blue > maxBlue) {
			return 0;
		}

		if (set.green !== undefined && set.green > maxGreen) {
			return 0;
		}

		if (set.red !== undefined && set.red > maxRed) {
			return 0;
		}
	}

	return game.id;
};

export const partOne = (input: string): number => {
	const games = input.split("\n");

	let result = 0;

	for (const game of games) {
		result += processLine(game);
	}

	return result;
};
