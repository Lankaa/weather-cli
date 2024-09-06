import chalk from 'chalk';
import dedent from 'dedent-js';
import { getIcon } from './api.service.js';

export const printError = (error) => {
	console.log(chalk.bgRed(' ERROR ') + ' ' + error);
}

export const printSuccess = (msg) => {
	console.log(chalk.bgGreen(' SUCCESS ') + ' ' + msg);
}

export const printHelp = () => {
	console.log(
		dedent(`${chalk.bgCyan(' HELP ')}
		Без параметров - вывод погоды
		-c [CITY] для установки города
		-h для вывода помощи
		-t [API_KEY] для сохранения токена`
	));
}

export const printWeather = (weather) => {
	console.log(
		dedent(`${chalk.bgYellow(' WEATHER INFO ')}
		CITY ${weather.name}
		WEATHER ${getIcon(weather.weather[0].icon)}  ${weather.weather[0].main}
		TEMPERATURE ${weather.main.temp} FEELS LIKE ${weather.main.feels_like}
		WiND SPEED  ${weather.wind.speed}`
	));
}