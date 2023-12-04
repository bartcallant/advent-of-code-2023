interface Card {
	winningNumbers: number[];
	numbers: number[];
	matchingNumbers: number[];
	count: number;
}

const parseLineToCard = (line: string): Card => {
	const cardString = line.split(": ")[1];

	if (cardString === undefined) {
		return {
			winningNumbers: [],
			numbers: [],
			matchingNumbers: [],
			count: 0,
		};
	}

	const [winningNumbersString, numbersString] = cardString.split(" | ");

	const winningNumbersStrings = winningNumbersString?.split(" ").filter(Boolean);

	const numbersStrings = numbersString?.split(" ").filter(Boolean);

	const winningNumbers = (winningNumbersStrings ?? []).map((value) => Number.parseInt(value));
	const numbers = (numbersStrings ?? []).map((value) => Number.parseInt(value));
	const matchingNumbers = findMatchingNumbers(winningNumbers, numbers);

	return {
		winningNumbers,
		numbers,
		matchingNumbers,
		count: 1,
	};
};

const findMatchingNumbers = (winningNumbers: number[], numbers: number[]): number[] => {
	const matchedNumbers: number[] = [];

	for (const winningNumber of winningNumbers) {
		if (numbers.includes(winningNumber)) {
			matchedNumbers.push(winningNumber);
		}
	}

	return matchedNumbers;
};

export const partTwo = (input: string): number => {
	const lines = input.split("\n");

	const cards = lines.map((line) => parseLineToCard(line));

	for (const [cardId, card] of cards.entries()) {
		if (card.matchingNumbers.length === 0) {
			continue;
		}

		const startIndex = cardId + 1;
		const endIndex =
			cardId + card.matchingNumbers.length > cards.length ? cards.length : cardId + card.matchingNumbers.length;

		for (let i = startIndex; i <= endIndex; i++) {
			const c = cards[i];

			if (c === undefined) {
				continue;
			}

			c.count += card.count;
		}
	}

	return cards.reduce((sum, card) => sum + card.count, 0);
};
