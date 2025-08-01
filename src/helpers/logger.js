import config from 'config';
import path from 'path';
import winston from 'winston';
import { dirname } from 'path';
import { fileURLToPath } from "url";

const logFileName = path.join(dirname(fileURLToPath(import.meta.url)), '../../', 'logs/the-distributor-hub.app.log');
const errorLogFileName = path.join(dirname(fileURLToPath(import.meta.url)), '../../', 'logs/the-distributor-hub.error.log');

let logger = null;

export const initLogger = () => {
	try {
		logger = winston.createLogger({
			format: winston.format.json(),
			exceptionHandlers: [
				new winston.transports.Console(),
				new winston.transports.File({
					filename: errorLogFileName,
					level: 'error',
					maxSize: config.logger.maxSize,
					maxFiles: config.logger.maxFiles
				})
			],
			transports: [
				new winston.transports.Console(),
				new winston.transports.File({
					filename: logFileName,
					maxSize: config.logger.maxSize,
					maxFiles: config.logger.maxFiles
				})
			]
		});
	} catch (err) {
		throw err;
	}
};

export const logInfo = (message, data) => {
	logger.log('info', message, data);
};

export const logError = (message, data) => {
	logger.log('error', message, data);
};

export const logWarn = (message, data) => {
	logger.log('warn', message, data);
};

export const logDebug = (message, data) => {
	logger.log('debug', message, data);
};

export const logSilly = (message, data) => {
	logger.log('silly', message, data);
};