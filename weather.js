#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { getWeather } from './services/api.service.js';
import { printHelp, printSuccess, printError, printWeather } from './services/log.service.js';
import { getKeyValue, saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';

const saveToken = async (token) => {
	if (!token.length) {
		printError('Token has not been received');
		return;
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.token, token);
		printSuccess('Token saved')
	} catch (error) {
		printError('saveToken ' + error.message);
	}
}

const getForecast = async () => {
	try {
		const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);
		const weather = await getWeather(city);
		printWeather(weather);
	} catch (error) {
		if (error?.response?.status === 404) {
			printError('City is not defined');
		} else if (error?.response?.status === 401) {
			printError('Token is not defined');
		} else {
			printError('getForecast ' + error.message);
		}
	}
}

const saveCity = async (city) => {
	if (!city.length) {
		printError('City has not been received');
		return;
	}

	try {
		await getWeather(city);
		await saveKeyValue(TOKEN_DICTIONARY.city, city);
		printSuccess('City saved')
	} catch (error) {
		printError('saveCity ' + error.message);
	}
}

const initCLI = () => {
	const args = getArgs(process.argv);

	if (args.h) {
		return printHelp();
	}

	if (args.c) {
		return saveCity(args.c);
	}
	
	if (args.t) {
		return saveToken(args.t)
	}

	getForecast();
}

initCLI();