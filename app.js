import http from 'http';
import config from 'config';
import { initLogger, logDebug, logError } from './src/helpers/logger.js';
import { initServer } from './bin/server.js';

let port;
let app;
let server;
let address;
let bind;

const initApp = async () => {
    port = config.port;
    app = await initServer();
    app.set('port', port);
    await initAppServer();
};

const initAppServer = async () => {
    try {
        server = http.createServer(app);
        server.listen(port);
        server.on('listening', () => {
            address = server.address();
            bind = typeof address === 'string' ? `pipe ${address}` : `port ${address.port}`;
            initLogger();
            logDebug(`Listening On: ${bind}`);
        });
    } catch (error) {
        logError(error);
        throw error;
    };
};

(async () => {
    process.setMaxListeners(0);
    await initApp();
})();
