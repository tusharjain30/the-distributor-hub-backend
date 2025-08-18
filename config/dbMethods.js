import { db } from "../src/helpers/db.js";

export const findOneDocument = (collectionName, filter, projection = {}) => {
    return db.collection(collectionName).findOne(
        { ...filter, isDeleted: false },
        { projection }
    );
};

export const insertDocument = (collectionName, data) => {
    return db.collection(collectionName).insertOne(data);
};

export const updateDocument = (collectionName, filter, update) => {
    return db.collection(collectionName).updateOne(
        { ...filter, isDeleted: false },
        update
    );
};

export const updateDocuments = (collectionName, filter, update) => {
    return db.collection(collectionName).updateMany(
        { ...filter, isDeleted: false },
        update
    );
};

export const findDocuments = (collectionName, filter, projection = {}, page = 1, limit = 100) => {
    return db.collection(collectionName)
        .find({ ...filter, isDeleted: false }, { projection })
        .skip((page - 1) * limit)
        .limit(limit)
        .toArray();
};

export const aggregateDocuments = (collectionName, pipeline) => {
    return db.collection(collectionName).aggregate(pipeline).toArray();
};