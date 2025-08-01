import db from './db.js';

export default {
    port: 3002,
    db: db.staging,
    logger: {
        maxSize: 512000,
        maxFiles: 100
    },
    secretKey: '0pG4m3rz',
    saltKey: 'G4m3r5',
    saltRounds: 5
};
