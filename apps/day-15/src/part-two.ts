import {hash} from "./hash";

interface Lens {
	label: string;
	operation: "-" | "=";
	focalLength?: number | undefined;
}

const parse = (input: string): Lens[] => {
	const reuslt: Lens[] = [];

	for (const lensString of input.split(",")) {
		const operationIndex = lensString.split("").findIndex((value) => value === "=" || value === "-");

		const label = lensString.substring(0, operationIndex);
		const operation = lensString.at(operationIndex);
		const focalLength = lensString.at(operationIndex + 1);

		if (operation === undefined) {
			continue;
		}

		if (operation !== "=" && operation !== "-") {
			continue;
		}

		reuslt.push({
			label,
			operation,
			...(focalLength !== undefined ? {focalLength: Number.parseInt(focalLength)} : {}),
		});
	}

	return reuslt;
};

export const partTwo = (input: string): number => {
	const lenses = parse(input);

	const boxes = new Map<number, Lens[]>();

	for (const lens of lenses) {
		const box = hash(lens.label.split(""));

		const lensesInBox = boxes.get(box) ?? [];

		const lensIndexInBox = lensesInBox.findIndex((l) => l.label === lens.label);

		if (lens.operation === "-") {
			if (lensIndexInBox === -1) {
				continue;
			}

			lensesInBox.splice(lensIndexInBox, 1);
		} else if (lens.operation === "=") {
			if (lensIndexInBox === -1) {
				lensesInBox.push(lens);
			} else {
				lensesInBox[lensIndexInBox] = lens;
			}
		}

		boxes.set(box, lensesInBox);
	}

	let result = 0;

	for (const [boxIndex, box] of boxes.entries()) {
		for (let lensIndex = 0; lensIndex < box.length; lensIndex++) {
			const lens = box[lensIndex];

			if (lens === undefined) {
				continue;
			}

			result += (boxIndex + 1) * (lensIndex + 1) * (lens.focalLength ?? 0);
		}
	}

	return result;
};
