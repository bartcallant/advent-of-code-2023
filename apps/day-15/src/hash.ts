export const hash = (sequence: string[]): number => {
	let sequenceValue = 0;

	for (const value of sequence) {
		sequenceValue += value.charCodeAt(0);
		sequenceValue *= 17;
		sequenceValue = sequenceValue % 256;
	}

	return sequenceValue;
};
