import {
	Tree,
	formatFiles,
	generateFiles,
	joinPathFragments,
	readProjectConfiguration,
	updateJson,
	updateProjectConfiguration,
} from "@nx/devkit";
import {applicationGenerator as nodeApplicationGenerator} from "@nx/node";

import {ApplicationGeneratorSchema} from "./schema";

export async function applicationGenerator(tree: Tree, options: ApplicationGeneratorSchema) {
	const paddedDay = options.day.toString().padStart(2, "0");

	const name = `day-${paddedDay}`;

	await nodeApplicationGenerator(tree, {
		name,
		bundler: "esbuild",
		directory: `apps/`,
		framework: "none",
		e2eTestRunner: "none",
	});

	const configuration = readProjectConfiguration(tree, name);

	// Using ESM, so the file exists as `jest.preset.cjs`
	tree.delete("jest.preset.js");

	// Not using assets
	tree.delete(`${configuration.sourceRoot}/assets/.gitkeep`);

	// Move main.ts to index.ts
	tree.rename(`${configuration.sourceRoot}/main.ts`, `${configuration.sourceRoot}/index.ts`);

	// undo changes to package.json
	updateJson(tree, `package.json`, (file) => {
		delete file.devDependencies["@swc-node/register"];
		delete file.devDependencies["@swc/core"];

		return file;
	});

	// jest.config.ts
	// change preset to cjs file
	const contents = tree.read(`${configuration.root}/jest.config.ts`, "utf-8");
	if (contents !== null) {
		tree.write(
			`${configuration.root}/jest.config.ts`,
			contents.replace("../../jest.preset.js", "../../jest.preset.cjs"),
		);
	}

	// project.json
	const targets = configuration.targets;

	if (targets !== undefined) {
		if (targets?.["serve"] !== undefined) {
			// Copy serve target to run
			targets["run"] = targets["serve"];

			// Disable watch for run
			targets["run"].options = {
				...targets["run"].options,
				watch: false,
			};

			// Remove serve
			delete targets["serve"];
		}

		if (targets?.["build"] !== undefined) {
			// Use ESM
			// Enable bundling
			// Change main to index.ts
			targets["build"].options = {
				...targets?.["build"].options,
				format: ["esm"],
				bundle: true,
				main: `${configuration.root}/src/index.ts`,
			};

			delete targets["build"].options.assets;
		}
	}

	updateProjectConfiguration(tree, name, {
		...configuration,
		targets: targets ?? {},
	});

	// tsconfig.app.json
	// remove compilerOptions.module
	updateJson(tree, `${configuration.root}/tsconfig.app.json`, (file) => {
		delete file.compilerOptions.module;

		return file;
	});

	// tsconfig.json
	// remove esModuleInterop from compilerOptions
	updateJson(tree, `${configuration.root}/tsconfig.json`, (file) => {
		delete file.compilerOptions.esModuleInterop;

		return file;
	});

	// tsconfig.spec.json
	// remove compileroptions.module
	updateJson(tree, `${configuration.root}/tsconfig.spec.json`, (file) => {
		delete file.compilerOptions.module;

		return file;
	});

	// Copy template files
	generateFiles(tree, joinPathFragments(__dirname, "./files"), configuration.root, options);

	// Modify index.ts
	tree.write(
		`${configuration.sourceRoot}/index.ts`,
		`import {input} from "./input";
import {partOne} from "./part-one";
import {partTwo} from "./part-two";

console.log(\`Day ${paddedDay} ::: Part one ::: \${partOne(input)}\`);
console.log(\`Day ${paddedDay} ::: Part two ::: \${partTwo(input)}\`);
`,
	);

	// Make sure all files are formatted
	await formatFiles(tree);
}

export default applicationGenerator;
