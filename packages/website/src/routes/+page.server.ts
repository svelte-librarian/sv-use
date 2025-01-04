import fs from 'node:fs/promises';
import path from 'node:path';

const CORE_DIRECTORY = './src/lib/docs/core';

export const load = async () => {
	return {
		totalUtilities: await countUtilities(CORE_DIRECTORY)
	};
};

async function countUtilities(dirPath: string) {
	let count = 0;
	const coreEntries = await fs.readdir(dirPath, { withFileTypes: true });

	for (const entry of coreEntries) {
		const filePath = path.join(dirPath, entry.name);
		const stat = await fs.stat(filePath);

		if (stat.isFile() && path.extname(filePath) === '.md') {
			count += 1;
		} else if (stat.isDirectory()) {
			count += await countUtilities(filePath);
		}
	}

	return count;
}
