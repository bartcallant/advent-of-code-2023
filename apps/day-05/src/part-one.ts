interface Almanac {
	seeds: number[];
	seedToSoilMaps: Mapper[];
	soilToFertilizerMaps: Mapper[];
	fertilizerToWaterMaps: Mapper[];
	waterToLightMaps: Mapper[];
	lightToTemperatureMaps: Mapper[];
	temperatureToHumidityMaps: Mapper[];
	humidityToLocationMaps: Mapper[];
}

const parseAlmanac = (input: string): Almanac => {
	const parts = input.split("\n\n");

	const seeds = parts[0]
		?.replace("seeds: ", "")
		.split(" ")
		.map((value) => Number.parseInt(value));

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

	return {
		seeds: seeds ?? [],
		seedToSoilMaps: seedToSoilMaps ?? [],
		soilToFertilizerMaps: soilToFertilizerMaps ?? [],
		fertilizerToWaterMaps: fertilizerToWaterMaps ?? [],
		waterToLightMaps: waterToLightMaps ?? [],
		lightToTemperatureMaps: lightToTemperatureMaps ?? [],
		temperatureToHumidityMaps: temperatureToHumidityMaps ?? [],
		humidityToLocationMaps: humidityToLocationMaps ?? [],
	};
};

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

export const partOne = (input: string): number => {
	const almanac = parseAlmanac(input);

	const locations = almanac.seeds.map((seed) => {
		const soil = calculateDestinationFromMaps(seed, almanac.seedToSoilMaps);
		const fertilizer = calculateDestinationFromMaps(soil, almanac.soilToFertilizerMaps);
		const water = calculateDestinationFromMaps(fertilizer, almanac.fertilizerToWaterMaps);
		const light = calculateDestinationFromMaps(water, almanac.waterToLightMaps);
		const temperature = calculateDestinationFromMaps(light, almanac.lightToTemperatureMaps);
		const humidity = calculateDestinationFromMaps(temperature, almanac.temperatureToHumidityMaps);
		const location = calculateDestinationFromMaps(humidity, almanac.humidityToLocationMaps);

		return location;
	});

	let lowest = locations[0];

	for (const location of locations) {
		if (lowest === undefined) {
			lowest = location;

			continue;
		}

		if (location < lowest) {
			lowest = location;
		}
	}

	return lowest ?? 0;
};
