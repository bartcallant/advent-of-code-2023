export const partTwo = (input: string): number => {
	const [timesString, distancesString] = input.split("\n");

	if (timesString === undefined || distancesString === undefined) {
		return 0;
	}

	const timeString = timesString.replace("Time:", "").split(" ").filter(Boolean).join("");
	const recordString = distancesString.replace("Distance:", "").split(" ").filter(Boolean).join("");

	const time = Number.parseInt(timeString);
	const record = Number.parseInt(recordString);

	let numberOfRecordBreakingTimeHolePosibilities = 0;

	for (let i = 1; i < time; i++) {
		const speedMultiplier = i;
		const timeLeft = time - i;

		const distance = speedMultiplier * timeLeft;

		if (distance > record) {
			numberOfRecordBreakingTimeHolePosibilities++;
		}
	}

	return numberOfRecordBreakingTimeHolePosibilities;
};
