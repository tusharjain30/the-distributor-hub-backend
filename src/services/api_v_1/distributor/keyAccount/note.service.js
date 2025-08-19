import moment from "moment-timezone";
import { RESPONSE } from "../../../../helpers/response.js";
import { findOneDocument, insertDocument, updateDocument } from "../../../../../config/dbMethods.js";
import { COLLECTION_NAMES, RESPONSE_CODES, RESPONSE_MESSAGES } from "../../../../../config/constants.js";
import { ObjectId } from "mongodb";

export const getKeyAccountNoteDetails = async ({ queryType, _id, createdBy, distributorId, accountId }) => {
    try {
        let response = RESPONSE;
        const queryFilter = {
            isDeleted: false
        };

        let projection = {};

        const LIMITED_DETAIL_PROJECTION = {
            note: 1,
            date: 1
        };

        if (queryType === 'id') {
            queryFilter._id = new ObjectId(_id);
        } else if (queryType === 'limited_detail') {
            queryFilter._id = new ObjectId(_id);
            projection = LIMITED_DETAIL_PROJECTION;
        } else if (queryType === "distributorId_accountId_createdBy") {
            queryFilter._id = new ObjectId(_id);
            queryFilter.distributorId = new ObjectId(distributorId);
            queryFilter.createdBy = new ObjectId(createdBy);
            queryFilter.accountId = new ObjectId(accountId);
            projection = LIMITED_DETAIL_PROJECTION;
        };

        const contact_details = await findOneDocument(COLLECTION_NAMES.KEY_ACCOUNT_NOTES, queryFilter, projection);
        if (contact_details) {
            response = {
                status: 1,
                message: RESPONSE_MESSAGES.NOTE_FETCH_SUCCESS,
                statusCode: RESPONSE_CODES.GET,
                data: contact_details
            };
        } else {
            response = {
                status: 0,
                message: RESPONSE_MESSAGES.DATA_NOT_FOUND,
                statusCode: RESPONSE_CODES.NOT_FOUND,
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

export const deleteKeyAccountNoteService = async ({ distributorId, accountId, noteId, createdBy }) => {
    try {
        let response = RESPONSE;
        const currentTime = parseInt(moment().tz(process.env.TIMEZONE).format("x"));
        createdBy = new ObjectId(createdBy);
        distributorId = new ObjectId(distributorId);
        accountId = new ObjectId(accountId);
        let result = await updateDocument(COLLECTION_NAMES.KEY_ACCOUNT_NOTES, {
            _id: new ObjectId(noteId),
            createdBy,
            distributorId,
            accountId
        }, {
            $set: {
                isDeleted: true,
                updatedAt: currentTime
            }
        });

        if (result.matchedCount === 0) {
            response = {
                status: 0,
                message: RESPONSE_MESSAGES.DATA_NOT_FOUND,
                statusCode: RESPONSE_CODES.NOT_FOUND,
                data: {}
            };
        } else {
            await updateDocument(COLLECTION_NAMES.DISTRIBUTOR_KEY_ACCOUNTS, { _id: accountId, createdBy, distributorId }, { $inc: { notes: -1 } });
            response = {
                status: 1,
                message: RESPONSE_MESSAGES.NOTE_DELETE_SUCCESS,
                statusCode: RESPONSE_CODES.GET,
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