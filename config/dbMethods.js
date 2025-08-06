import { db } from "../src/helpers/db.js";

export const findOne = (COLLECTION_NAME, query, obj = {}) => {
    return db.collection(COLLECTION_NAME).findOne(query, { projection: obj });
};

export const insertOne = (COLLECTION_NAME, data) => {
    return db.collection(COLLECTION_NAME).insertOne(data);
};

export const updateOne = (COLLECTION_NAME, filter, update) => {
    return db.collection(COLLECTION_NAME).updateOne(filter, { $set: update });
};

export const updateMany = (COLLECTION_NAME, filter, update) => {
    return db.collection(COLLECTION_NAME).updateMany(filter, { $set: update });
};

export const find = (COLLECTION_NAME, query, obj = {}, page = 1, limit = 100) => {
    return db.collection(COLLECTION_NAME).find(query, { projection: obj }).skip((page - 1) * limit).limit(limit).toArray();;
};