interface Mapper {
	destinationRangeStart: number;
	sourceRangeStart: number;
	rangeLength: number;
}

const calculateDestinationFromMaps = (start: number, mappers: Mapper[]): number => {
	for (const map of mappers) {
		if (start >= map.sourceRangeStart && start < map.sourceRangeStart + map.rangeLength) {
			const diff = start - map.sourceRangeStart;

			return map.destinationRangeStart + diff;
		}
	}

	return start;
};

export const partTwo = (input: string): number => {
	const parts = input.split("\n\n");

	const mapParser = (value: string) => {
		const parts = value.split(" ");

		return {
			destinationRangeStart: Number.parseInt(parts[0] ?? "0"),
			sourceRangeStart: Number.parseInt(parts[1] ?? "0"),
			rangeLength: Number.parseInt(parts[2] ?? "0"),
		};
	};

	const seedToSoilMaps = parts[1]
		?.replace("seed-to-soil map:\n", "")
		.split("\n")
		.map((value) => mapParser(value));

	const soilToFertilizerMaps = parts[2]
		?.replace("soil-to-fertilizer map:\n", "")
		.split("\n")
		.map((value) => mapParser(value));

	const fertilizerToWaterMaps = parts[3]
		?.replace("fertilizer-to-water map:\n", "")
		.split("\n")
		.map((value) => mapParser(value));

	const waterToLightMaps = parts[4]
		?.replace("water-to-light map:\n", "")
		.split("\n")
		.map((value) => mapParser(value));

	const lightToTemperatureMaps = parts[5]
		?.replace("light-to-temperature map:\n", "")
		.split("\n")
		.map((value) => mapParser(value));

	const temperatureToHumidityMaps = parts[6]
		?.replace("temperature-to-humidity map:\n", "")
		.split("\n")
		.map((value) => mapParser(value));

	const humidityToLocationMaps = parts[7]
		?.replace("humidity-to-location map:\n", "")
		.split("\n")
		.map((value) => mapParser(value));

	const seedPairs = parts[0]
		?.replace("seeds: ", "")
		.split(" ")
		.map((value) => Number.parseInt(value));

	let lowest: number | undefined = undefined;

	for (let i = 0; i < (seedPairs ?? []).length; i += 2) {
		const start = seedPairs?.[i] ?? 0;
		const length = seedPairs?.[i + 1] ?? 0;

		const end = start + length;

		for (let j = start; j < end; j++) {
			const soil = calculateDestinationFromMaps(j, seedToSoilMaps ?? []);
			const fertilizer = calculateDestinationFromMaps(soil, soilToFertilizerMaps ?? []);
			const water = calculateDestinationFromMaps(fertilizer, fertilizerToWaterMaps ?? []);
			const light = calculateDestinationFromMaps(water, waterToLightMaps ?? []);
			const temperature = calculateDestinationFromMaps(light, lightToTemperatureMaps ?? []);
			const humidity = calculateDestinationFromMaps(temperature, temperatureToHumidityMaps ?? []);
			const location = calculateDestinationFromMaps(humidity, humidityToLocationMaps ?? []);

			if (lowest === undefined) {
				lowest = location;

				continue;
			}

			if (location < lowest) {
				lowest = location;
			}
		}
	}

	return lowest ?? 0;
};
