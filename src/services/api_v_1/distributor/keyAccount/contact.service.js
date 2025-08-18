import { ObjectId } from "mongodb";
import { RESPONSE } from "../../../../helpers/response.js";
import { COLLECTION_NAMES, RESPONSE_CODES, RESPONSE_MESSAGES } from "../../../../../config/constants.js";
import { findOneDocument, insertDocument, updateDocument, updateDocuments } from "../../../../../config/dbMethods.js";
import moment from "moment-timezone";

export const getKeyAccountContactDetails = async ({ queryType, _id, email, phone, createdBy, distributorId, accountId }) => {
    try {
        let response = RESPONSE;
        const queryFilter = {
            isDeleted: false
        };
        let projection = {};

        const LIMITED_DETAIL_PROJECTION = {
            contactName: 1,
            email: 1,
            phone: 1,
            jobTitle: 1,
            isPrimary: 1,
        };

        if (queryType === 'id') {
            queryFilter._id = new ObjectId(_id);
        } else if (queryType === 'phone') {
            queryFilter.phone = phone;
        } else if (queryType === 'limited_detail') {
            queryFilter._id = new ObjectId(_id);
            projection = LIMITED_DETAIL_PROJECTION;
        } else if (queryType === "distributorId_accountId_createdBy") {
            queryFilter._id = new ObjectId(_id);
            queryFilter.distributorId = new ObjectId(distributorId);
            queryFilter.createdBy = new ObjectId(createdBy);
            queryFilter.accountId = new ObjectId(accountId);
            projection = LIMITED_DETAIL_PROJECTION;
        } else if (queryType === "emailNotEqual") {
            queryFilter.email = email.toLowerCase();
            queryFilter._id = { $ne: new ObjectId(_id) };
        } else if (queryType === "phoneNotEqual") {
            queryFilter.phone = phone;
            queryFilter._id = { $ne: new ObjectId(_id) };
        } else {
            queryFilter.email = email.toLowerCase();
        };
        const contact_details = await findOneDocument(COLLECTION_NAMES.KEY_ACCOUNT_CONTACTS, queryFilter, projection);
        if (contact_details) {
            response = {
                status: 1,
                message: RESPONSE_MESSAGES.CONTACT_FETCH_SUCCESS,
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

export const addKeyAccountContactService = async ({ contactName, jobTitle, email, phone, isPrimary, distributorId, accountId, createdBy }) => {
    try {
        let response = RESPONSE;
        const currentTime = parseInt(moment().tz(process.env.TIMEZONE).format("x"));
        distributorId = new ObjectId(distributorId);
        accountId = new ObjectId(accountId);
        createdBy = new ObjectId(createdBy);
        if (isPrimary) {
            await updateDocuments(COLLECTION_NAMES.KEY_ACCOUNT_CONTACTS, { accountId, distributorId, createdBy }, {
                $set: {
                    isPrimary: false
                }
            });
        };
        const result = await insertDocument(COLLECTION_NAMES.KEY_ACCOUNT_CONTACTS, {
            contactName,
            jobTitle,
            email,
            phone,
            isPrimary,
            distributorId,
            accountId,
            createdBy,
            updatedBy: null,
            isDeleted: false,
            createdAt: currentTime,
            updatedAt: currentTime
        });
        if (result.acknowledged) {
            await updateDocument(COLLECTION_NAMES.DISTRIBUTOR_KEY_ACCOUNTS, { _id: accountId, distributorId, createdBy }, { $inc: { contacts: 1 } });
            response = {
                status: 1,
                message: RESPONSE_MESSAGES.CONTACT_ADD_SUCCESS,
                statusCode: RESPONSE_CODES.POST,
                data: { insertedId: result.insertedId }
            };
        } else {
            response = {
                status: 0,
                message: RESPONSE_MESSAGES.CONTACT_ADD_FAILED,
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

export const deleteKeyAccountContactService = async ({ accountId, createdBy, distributorId, contactId }) => {
    try {
        let response = RESPONSE;
        createdBy = new ObjectId(createdBy);
        distributorId = new ObjectId(distributorId);
        contactId = new ObjectId(contactId);
        accountId = new ObjectId(accountId);
        const currentTime = parseInt(moment().tz(process.env.TIMEZONE).format("x"));

        let result = await updateDocument(COLLECTION_NAMES.KEY_ACCOUNT_CONTACTS, { _id: contactId, createdBy, distributorId, accountId }, {
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
            await updateDocument(COLLECTION_NAMES.DISTRIBUTOR_KEY_ACCOUNTS, { _id: accountId, createdBy, distributorId }, { $inc: { contacts: -1 } });
            response = {
                status: 1,
                message: RESPONSE_MESSAGES.CONTACT_DELETE_SUCCESS,
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