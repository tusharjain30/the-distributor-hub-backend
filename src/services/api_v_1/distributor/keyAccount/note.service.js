import moment from "moment-timezone";
import { RESPONSE } from "../../../../helpers/response.js";
import { insertDocument, updateDocument } from "../../../../../config/dbMethods.js";
import { COLLECTION_NAMES, RESPONSE_MESSAGES } from "../../../../../config/constants.js";
import { ObjectId } from "mongodb";

export const addKeyAccountNoteService = async ({ accountId, createdBy, distributorId, date, note }) => {
    try {
        let response = RESPONSE;
        accountId = new ObjectId(accountId);
        distributorId = new ObjectId(distributorId);
        createdBy = new ObjectId(createdBy);
        const currentTime = parseInt(moment().tz(process.env.TIMEZONE).format("x"));
        const result = await insertDocument(COLLECTION_NAMES.KEY_ACCOUNT_NOTES, {
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
            await updateDocument(COLLECTION_NAMES.DISTRIBUTOR_KEY_ACCOUNTS, { _id: accountId, distributorId, createdBy }, { $inc: { notes: 1 } });
            response = {
                status: 1,
                message: RESPONSE_MESSAGES.NOTE_ADD_SUCCESS,
                statusCode: RESPONSE_CODES.POST,
                data: { insertedId: result.insertedId }
            };
        } else {
            response = {
                status: 0,
                message: RESPONSE_MESSAGES.NOTE_ADD_FAILED,
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