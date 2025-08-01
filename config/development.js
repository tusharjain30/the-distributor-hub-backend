import db from './db.js';

export default {
	port: 3001,
	db: db.development,
	logger: {
		maxSize: 512000,
		maxFiles: 100
	},
	secretKey: '0pG4m3rz',
	saltKey: 'G4m3r5',
	saltRounds: 2,
};
