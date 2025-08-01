import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import path from "path";
import { checkConnection, connectMongo } from "../src/helpers/db.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { authMiddleWare } from "../src/helpers/middlewares.js";
import routes from "../src/routes/index.js";

export const initServer = async () => {
    try {
        const app = express();
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(express.static(path.join(dirname(fileURLToPath(import.meta.url)), '../', 'public')));
        app.use(cors({
            exposeHeaders: ['date', 'content-type', 'content-length', 'connection', 'server',
                'x-powered-by', 'access-control-allow-origin', 'authorization', 'x-final-url'],
            allowHeaders: ['content-type', 'accept', 'authorization']
        }));
        app.use(helmet());
        await connectMongo();
        app.use(authMiddleWare);
        app.use("/api_v_1", routes);
        await healthCheckRoute(app);
        await healthyDB(app);
        return app;

    } catch (error) {
        throw error;
    };
};

const healthCheckRoute = async (app) => {
    try {
        app.get('/', (req, res) => {
            res.json({
                status: 'HEALTHY',
                msg: 'This works perfectly fine'
            });
        });
    } catch (error) {
        throw error;
    };
};

const healthyDB = async (app) => {
    try {
        if (await checkConnection()) {
            app.get('/health', (req, res) => {
                res.json({
                    msg: 'DB Connection Successfull'
                });
            });
            console.log("DB Connection Successfull");
            return;
        };
        throw new Error('Error connecting to DB');
    } catch (error) {
        throw error;
    };
};