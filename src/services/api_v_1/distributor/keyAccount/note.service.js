import moment from "moment-timezone";
import { RESPONSE } from "../../../../helpers/response.js";
import { insertOne } from "../../../../../config/dbMethods.js";
import { COLLECTION_NAMES, RESPONSE_MESSAGES } from "../../../../../config/constants.js";
import { ObjectId } from "mongodb";

export const addAccountNoteService = async ({ accountId, createdBy, distributorId, date, note }) => {
    try {
        let response = RESPONSE;
        accountId = new ObjectId(accountId);
        distributorId = new ObjectId(distributorId);
        createdBy = new ObjectId(createdBy);
        const currentTime = parseInt(moment().tz(process.env.TIMEZONE).format("x"));
        const result = await insertOne(COLLECTION_NAMES.KEY_ACCOUNT_NOTE_COLLECTION, {
            note,
            date,
            distributorId,
            accountId,
            createdBy,
            updatedBy: null,
            isDeleted: false,
            createdAt: currentTime,
            updatedAt: currentTime
        });
        if (result.acknowledged) {
            await updateOne(COLLECTION_NAMES.DISTRIBUTOR_KEY_ACCOUNT_COLLECTION, { _id: accountId, distributorId, createdBy }, { $inc: { notes: 1 } });
            response = {
                status: 1,
                message: RESPONSE_MESSAGES.NOTE_ADDED,
                statusCode: RESPONSE_CODES.POST,
                data: { insertedId: result.insertedId }
            };
        } else {
            response = {
                status: 0,
                message: RESPONSE_MESSAGES.FAILED_TO_ADD_NOTE,
                statusCode: RESPONSE_CODES.BAD_REQUEST,
                data: {}
            };
        };
        return response;
    } catch (error) {
        throw {
            status: 0,
            message: error.message,
            statusCode: RESPONSE_CODES.ERROR,
            data: {}
        };
    };
};