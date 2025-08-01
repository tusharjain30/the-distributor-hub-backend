import config from "config";
import { MongoClient } from "mongodb";

let mongoSession;
const mongoConfig = config.db.mongo;
const MONGO_URI = `mongodb://${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.database}`;

const client = await MongoClient.connect(MONGO_URI);
export const db = client.db(mongoConfig.database);

export const connectMongo = async () => {
    try {
        client.withSession(session => {
            mongoSession = session;

        });
    } catch (err) {
        throw err;
    };
};

export const checkConnection = async () => {
    if (client) {
        return true;
    };
    return false;
};