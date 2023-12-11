export const findRoutes = (galaxies: [number, number][]): [[number, number], [number, number]][] => {
	const routes = new Map<string, [[number, number], [number, number]]>();

	for (const galaxy of galaxies) {
		for (const g of galaxies) {
			if (galaxy === g) {
				continue;
			}

			const key = `${galaxy[0]}-${galaxy[1]}--${g[0]}-${g[1]}`;
			const reverseKey = `${g[0]}-${g[1]}--${galaxy[0]}-${galaxy[1]}`;

			if (routes.has(key)) {
				continue;
			}

			if (routes.has(reverseKey)) {
				continue;
			}

			routes.set(key, [galaxy, g]);
		}
	}

	return Array.from(routes.values());
};
