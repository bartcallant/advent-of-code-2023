interface Card {
	winningNumbers: number[];
	numbers: number[];
}

const parseLineToCard = (line: string): Card => {
	const cardString = line.split(": ")[1];

	if (cardString === undefined) {
		return {
			winningNumbers: [],
			numbers: [],
		};
	}

	const [winningNumbersString, numbersString] = cardString.split(" | ");

	const winningNumbersStrings = winningNumbersString?.split(" ").filter(Boolean);

	const numbersStrings = numbersString?.split(" ").filter(Boolean);

	return {
		winningNumbers: (winningNumbersStrings ?? []).map((value) => Number.parseInt(value)),
		numbers: (numbersStrings ?? []).map((value) => Number.parseInt(value)),
	};
};

const findMatchingNumbers = (card: Card): number[] => {
	const matchedNumbers: number[] = [];

	for (const winningNumber of card.winningNumbers) {
		if (card.numbers.includes(winningNumber)) {
			matchedNumbers.push(winningNumber);
		}
	}

	return matchedNumbers;
};

const calculateScoresForMatchedNumbers = (matchedNumbers: number[]): number => {
	let score = 0;

	for (let i = 0; i < matchedNumbers.length; i++) {
		if (i === 0) {
			score = 1;

			continue;
		}

		score *= 2;
	}

	return score;
};

export const partOne = (input: string): number => {
	const lines = input.split("\n");

	const cards = lines.map((line) => parseLineToCard(line));

	const matchedNumbers = cards.map((card) => findMatchingNumbers(card));

	const scores = matchedNumbers.map((matchedNumbers) => calculateScoresForMatchedNumbers(matchedNumbers));

	return scores.reduce((sum, currentSCore) => sum + currentSCore, 0);
};
