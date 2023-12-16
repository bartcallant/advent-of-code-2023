type Direction = "up" | "down" | "left" | "right";

const calculateNextPosition = (currentPosition: [number, number], direction: Direction): PositionCheck => {
	let position: [number, number] = [0, 0];

	switch (direction) {
		case "up":
			position = [currentPosition[0] - 1, currentPosition[1]];

			break;
		case "down":
			position = [currentPosition[0] + 1, currentPosition[1]];

			break;
		case "left":
			position = [currentPosition[0], currentPosition[1] - 1];

			break;
		case "right":
			position = [currentPosition[0], currentPosition[1] + 1];

			break;
	}

	return {
		position,
		direction,
	};
};

interface PositionCheck {
	position: [number, number];
	direction: Direction;
}

export const calculateNumberOfEnergizedTiles = (
	map: Map<string, string>,
	startPositionCheck: PositionCheck,
): number => {
	const energizedPositions = new Map<string, PositionCheck>();

	const positionsToCheck: PositionCheck[] = [startPositionCheck];

	while (positionsToCheck.length > 0) {
		const currentPosition = positionsToCheck.shift();

		if (currentPosition === undefined) {
			break;
		}

		const value = map.get(`${currentPosition.position[0]}-${currentPosition.position[1]}`);

		if (value === undefined) {
			continue;
		}

		energizedPositions.set(`${currentPosition.position[0]}-${currentPosition.position[1]}`, currentPosition);

		const nextPositions: PositionCheck[] = [];

		switch (value) {
			case ".": {
				nextPositions.push(calculateNextPosition(currentPosition.position, currentPosition.direction));

				break;
			}
			case "/": {
				if (currentPosition.direction === "right") {
					nextPositions.push(calculateNextPosition(currentPosition.position, "up"));
				}

				if (currentPosition.direction === "left") {
					nextPositions.push(calculateNextPosition(currentPosition.position, "down"));
				}

				if (currentPosition.direction === "down") {
					nextPositions.push(calculateNextPosition(currentPosition.position, "left"));
				}

				if (currentPosition.direction === "up") {
					nextPositions.push(calculateNextPosition(currentPosition.position, "right"));
				}

				break;
			}
			case "\\": {
				if (currentPosition.direction === "right") {
					nextPositions.push(calculateNextPosition(currentPosition.position, "down"));
				}

				if (currentPosition.direction === "left") {
					nextPositions.push(calculateNextPosition(currentPosition.position, "up"));
				}

				if (currentPosition.direction === "down") {
					nextPositions.push(calculateNextPosition(currentPosition.position, "right"));
				}

				if (currentPosition.direction === "up") {
					nextPositions.push(calculateNextPosition(currentPosition.position, "left"));
				}

				break;
			}
			case "-": {
				if (currentPosition.direction === "right" || currentPosition.direction === "left") {
					nextPositions.push(calculateNextPosition(currentPosition.position, currentPosition.direction));

					break;
				}

				nextPositions.push(
					calculateNextPosition(currentPosition.position, "left"),
					calculateNextPosition(currentPosition.position, "right"),
				);

				break;
			}
			case "|": {
				if (currentPosition.direction === "up" || currentPosition.direction === "down") {
					nextPositions.push(calculateNextPosition(currentPosition.position, currentPosition.direction));

					break;
				}

				nextPositions.push(
					calculateNextPosition(currentPosition.position, "up"),
					calculateNextPosition(currentPosition.position, "down"),
				);

				break;
			}
			default:
				console.log("Unrecognized value to process:", value);
				continue;
		}

		for (const nextPoistion of nextPositions) {
			const nextPoistionKey = `${nextPoistion.position[0]}-${nextPoistion.position[1]}`;

			const energizedPosition = energizedPositions.get(nextPoistionKey);

			if (energizedPosition === undefined) {
				positionsToCheck.push(nextPoistion);

				continue;
			}

			if (energizedPosition.direction === nextPoistion.direction) {
				continue;
			}

			positionsToCheck.push(nextPoistion);
		}
	}

	return energizedPositions.size;
};
