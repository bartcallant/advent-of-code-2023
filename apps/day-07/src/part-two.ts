enum Type {
	FIVE_OF_A_KIND = "FIVE_OF_A_KIND",
	FOUR_OF_A_KIND = "FOUR_OF_A_KIND",
	FULL_HOUSE = "FULL_HOUSE",
	THREE_OF_A_KIND = "THREE_OF_A_KIND",
	TWO_PAIR = "TWO_PAIR",
	ONE_PAIR = "ONE_PAIR",
	HIGH_CARD = "HIGH_CARD",
}

enum TypePower {
	FIVE_OF_A_KIND = 7,
	FOUR_OF_A_KIND = 6,
	FULL_HOUSE = 5,
	THREE_OF_A_KIND = 4,
	TWO_PAIR = 3,
	ONE_PAIR = 2,
	HIGH_CARD = 1,
}

interface Hand {
	bid: number;
	cards: string[];
	type: Type;
}

const calculateHandType = (cards: string[]): Type => {
	const cardCountMap = new Map<string, number>();

	let numberOfJokerCards = 0;

	for (const card of cards) {
		if (card === "J") {
			numberOfJokerCards++;

			continue;
		}

		let existing = cardCountMap.get(card);

		if (existing === undefined) {
			cardCountMap.set(card, 1);

			continue;
		}

		cardCountMap.set(card, (existing += 1));
	}

	if (numberOfJokerCards === 5) {
		cardCountMap.set("J", 5);
	} else if (numberOfJokerCards > 0) {
		const sortedCardCounts = Array.from(cardCountMap.entries()).sort((a, b) => {
			if (b[1] !== a[1]) {
				return b[1] - a[1];
			}

			const aCardPower = mapCardToPower(a[0]);
			const bCardPower = mapCardToPower(b[0]);

			return bCardPower - aCardPower;
		});

		const cardWithMostCount = sortedCardCounts[0]?.[0];

		if (cardWithMostCount !== undefined) {
			cardCountMap.set(cardWithMostCount, (cardCountMap.get(cardWithMostCount) ?? 0) + numberOfJokerCards);
		}
	}

	if (cardCountMap.size === 1) {
		return Type.FIVE_OF_A_KIND;
	}

	if (cardCountMap.size === 2) {
		const first = Array.from(cardCountMap.values())[0];

		if (first === 1 || first === 4) {
			return Type.FOUR_OF_A_KIND;
		}

		return Type.FULL_HOUSE;
	}

	if (cardCountMap.size === 3) {
		const hasThree = Array.from(cardCountMap.values()).includes(3);

		if (hasThree) {
			return Type.THREE_OF_A_KIND;
		}

		return Type.TWO_PAIR;
	}

	if (cardCountMap.size === 4) {
		return Type.ONE_PAIR;
	}

	return Type.HIGH_CARD;
};

const parseHands = (input: string): Hand[] => {
	const result: Hand[] = [];

	const lines = input.split("\n");

	for (const line of lines) {
		const [handString, bidString] = line.split(" ");

		if (handString === undefined || bidString === undefined || handString.length !== 5) {
			continue;
		}

		const bid = Number.parseInt(bidString);

		const cards = handString.split("");

		result.push({
			bid,
			cards,
			type: calculateHandType(cards),
		});
	}

	return result;
};

const mapCardToPower = (card: string): number => {
	const value = Number.parseInt(card);

	if (!Number.isNaN(value)) {
		return value;
	}

	switch (card) {
		case "A":
			return 14;
		case "K":
			return 13;
		case "Q":
			return 12;
		case "J":
			return 1;
		case "T":
			return 10;
		default:
			return 0;
	}
};

const handSorter = (a: Hand, b: Hand): number => {
	const aTypePower = TypePower[a.type];
	const bTypePower = TypePower[b.type];

	if (aTypePower !== bTypePower) {
		return aTypePower - bTypePower;
	}

	for (let i = 0; i < 5; i++) {
		const aCard = a.cards[i];
		const bCard = b.cards[i];

		if (aCard === undefined || bCard === undefined) {
			continue;
		}

		const aCardPower = mapCardToPower(aCard);
		const bCardPower = mapCardToPower(bCard);

		if (aCardPower === bCardPower) {
			continue;
		}

		return aCardPower - bCardPower;
	}

	return 0;
};

export const partTwo = (input: string): number => {
	const hands = parseHands(input);

	const sortedHands = hands.sort(handSorter);

	return sortedHands.reduce((total, hand, index) => total + hand.bid * (index + 1), 0);
};
