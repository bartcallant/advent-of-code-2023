import {createTreeWithEmptyWorkspace} from "@nx/devkit/testing";
import {Tree, readProjectConfiguration} from "@nx/devkit";

import {applicationGenerator} from "./generator";
import {ApplicationGeneratorSchema} from "./schema";

describe("application generator", () => {
	let tree: Tree;
	const options: ApplicationGeneratorSchema = {day: 1};

	beforeEach(() => {
		tree = createTreeWithEmptyWorkspace();
	});

	it("should run successfully", async () => {
		await applicationGenerator(tree, options);
		const config = readProjectConfiguration(tree, "day-01");
		expect(config).toBeDefined();
	});
});
