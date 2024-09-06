import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';
``
const filePath = join(homedir(), 'weather.data.json');

export const TOKEN_DICTIONARY = {
	token: 'token',
	city: 'city',
}

const isExist = async (path) => {
	try {
		await promises.stat(path);

		return true
	} catch (error) {
		return false;
	}
}

const readFile = async () => {
	if (await isExist(filePath)) {
		const file = await promises.readFile(filePath);
		const data = JSON.parse(file);

		return data;
	}

	return {};
}

export const getKeyValue = async (key) => {
	const data = await readFile();
	
	return data[key];
}

export const saveKeyValue = async (key, value) => {
	let data = await readFile();
	data[key] = value;

	await promises.writeFile(filePath, JSON.stringify(data));
}
