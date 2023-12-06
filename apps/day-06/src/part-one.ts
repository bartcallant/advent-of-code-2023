interface Game {
	time: number;
	record: number;
}

interface GameWithNumberOfRecordBreakingTimeHoldPosibilities extends Game {
	numberOfRecordBreakingTimeHoldPosibilities: number;
}

const parseGames = (input: string): Game[] => {
	const games: Game[] = [];

	const [timesString, distancesString] = input.split("\n");

	if (timesString === undefined || distancesString === undefined) {
		return games;
	}

	const times = timesString
		.replace("Time:", "")
		.split(" ")
		.filter(Boolean)
		.map((value) => Number.parseInt(value));
	const distances = distancesString
		.replace("Distance:", "")
		.split(" ")
		.filter(Boolean)
		.map((value) => Number.parseInt(value));

	if (times.length !== distances.length) {
		return games;
	}

	for (let i = 0; i < times.length; i++) {
		const time = times[i];
		const distance = distances[i];

		if (time === undefined || distance === undefined) {
			continue;
		}

		games.push({time, record: distance});
	}

	return games;
};

export const partOne = (input: string): number => {
	const games = parseGames(input);

	const extendedGames: GameWithNumberOfRecordBreakingTimeHoldPosibilities[] = [];

	for (const game of games) {
		const extendedGame: GameWithNumberOfRecordBreakingTimeHoldPosibilities = {
			...game,
			numberOfRecordBreakingTimeHoldPosibilities: 0,
		};

		for (let i = 1; i < game.time; i++) {
			const speedMultiplier = i;
			const timeLeft = game.time - i;

			const distance = speedMultiplier * timeLeft;

			if (distance > game.record) {
				extendedGame.numberOfRecordBreakingTimeHoldPosibilities++;
			}
		}

		extendedGames.push(extendedGame);
	}

	return extendedGames.reduce((power, nextValue) => power * nextValue.numberOfRecordBreakingTimeHoldPosibilities, 1);
};
