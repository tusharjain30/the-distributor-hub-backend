import db from './db.js';

export default {
	port: 3009,
	db: db.production,
	logger: {
		maxSize: 5120000,
		maxFiles: 200
	},
	secretKey: 'T@j!nd3r0pG4mer5',
	saltKey: '0pG4m3r5T@j!nd3r',
	saltRounds: 8
};
