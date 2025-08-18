import { ObjectId } from "mongodb";
import { COLLECTION_NAMES, RESPONSE_CODES, RESPONSE_MESSAGES } from "../../../../config/constants.js";
import { findDocuments, findOneDocument, insertDocument, updateDocument, updateDocuments } from "../../../../config/dbMethods.js";
import { RESPONSE } from "../../../helpers/response.js";
import moment from "moment-timezone";

export const getDistributorContactDetails = async ({ queryType, _id, email, phone, createdBy, distributorId }) => {
    try {
        let response = RESPONSE;
        const queryFilter = {
            isDeleted: false
        };
        let projection = {};

        const LIMITED_DETAIL_PROJECTION = {
            name: 1,
            phone: 1,
            email: 1,
            title: 1,
            distributorId: 1,
            createdBy: 1
        };

        if (queryType === 'id') {
            queryFilter._id = new ObjectId(_id);
        } else if (queryType === 'createdBy') {
            queryFilter.createdBy = new ObjectId(createdBy);
            queryFilter.distributorId = new ObjectId(distributorId);
            queryFilter._id = new ObjectId(_id);
            projection = LIMITED_DETAIL_PROJECTION;
        } else if (queryType === 'phone') {
            queryFilter.phone = phone;
        } else if (queryType === 'limited_detail') {
            queryFilter._id = new ObjectId(_id);
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
        const contact_details = await findOneDocument(COLLECTION_NAMES.DISTRIBUTOR_CONTACTS, queryFilter, projection);
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

export const addDistributorContactService = async ({ name, title, email, phone, isPrimary, createdBy, distributorId }) => {
    try {
        let response = RESPONSE;
        const currentTime = parseInt(moment().tz(process.env.TIMEZONE).format("x"));
        createdBy = new ObjectId(createdBy);
        distributorId = new ObjectId(distributorId);
        const contactData = {
            name,
            title,
            email,
            phone,
            createdBy,
            distributorId,
            isDeleted: false,
            createdAt: currentTime,
            updatedAt: currentTime
        };
        const contact = await findDocuments(COLLECTION_NAMES.DISTRIBUTOR_CONTACTS, { createdBy, distributorId }, {
            name: 1,
            title: 1,
            email: 1,
            phone: 1,
            isPrimary: 1,
            createdBy: 1,
            distributorId: 1
        });
        if (contact && contact.length === 0) {
            contactData.isPrimary = true;
        } else if (contact.length !== 0 && isPrimary) {
            await updateDocuments(COLLECTION_NAMES.DISTRIBUTOR_CONTACTS, { createdBy, distributorId }, { $set: { isPrimary: false } });
            contactData.isPrimary = isPrimary;
        } else {
            contactData.isPrimary = false;
        };
        const result = await insertDocument(COLLECTION_NAMES.DISTRIBUTOR_CONTACTS, contactData);
        if (result.acknowledged) {
            await updateDocument(COLLECTION_NAMES.DISTRIBUTORS, { _id: distributorId, createdBy }, { $inc: { contacts: 1 } });
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

export const makeContactPrimaryService = async ({ createdBy, distributorId, contactId }) => {
    try {
        let response = RESPONSE;
        const currentTime = parseInt(moment().tz(process.env.TIMEZONE).format("x"));
        createdBy = new ObjectId(createdBy);
        distributorId = new ObjectId(distributorId);
        contactId = new ObjectId(contactId);
        await updateDocuments(COLLECTION_NAMES.DISTRIBUTOR_CONTACTS, { distributorId, createdBy }, { $set: { isPrimary: false } });
        const result = await updateDocument(COLLECTION_NAMES.DISTRIBUTOR_CONTACTS, { _id: contactId, createdBy, distributorId }, {
            $set: {
                isPrimary: true,
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
            response = {
                status: 1,
                message: RESPONSE_MESSAGES.CONTACT_MARK_PRIMARY_SUCCESS,
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

export const distributorContactListingService = async ({ createdBy, distributorId, page, limit }) => {
    try {
        let response = RESPONSE;
        createdBy = new ObjectId(createdBy);
        distributorId = new ObjectId(distributorId);
        const result = await findDocuments(COLLECTION_NAMES.DISTRIBUTOR_CONTACTS, { createdBy, distributorId }, {
            name: 1,
            title: 1,
            email: 1,
            phone: 1,
            isPrimary: 1,
            createdBy: 1,
            distributorId: 1
        }, page, limit);
        response = {
            status: 1,
            message: RESPONSE_MESSAGES.FETCHED,
            statusCode: RESPONSE_CODES.GET,
            data: result,
            pagination: {
                limit,
                page
            }
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

export const deleteDistributorContactService = async ({ createdBy, distributorId, contactId }) => {
    try {
        let response = RESPONSE;
        createdBy = new ObjectId(createdBy);
        distributorId = new ObjectId(distributorId);
        contactId = new ObjectId(contactId);
        const currentTime = parseInt(moment().tz(process.env.TIMEZONE).format("x"));
        const contacts = await findDocuments(COLLECTION_NAMES.DISTRIBUTOR_CONTACTS, { createdBy, distributorId });
        const isPrimaryContact = await findOneDocument(COLLECTION_NAMES.DISTRIBUTOR_CONTACTS, {
            _id: contactId,
            isPrimary: true,
            createdBy,
            distributorId
        });
        if (contacts.length > 1 && isPrimaryContact) {
            response = {
                status: 0,
                message: RESPONSE_MESSAGES.CONTACT_PRIMARY_DELETE_ERROR,
                statusCode: RESPONSE_CODES.BAD_REQUEST,
                data: {}
            };
        } else {
            let result = await updateDocument(COLLECTION_NAMES.DISTRIBUTOR_CONTACTS, { _id: contactId, createdBy, distributorId }, {
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
                await updateDocument(COLLECTION_NAMES.DISTRIBUTORS, { _id: distributorId, createdBy }, { $inc: { contacts: -1 } });
                response = {
                    status: 1,
                    message: RESPONSE_MESSAGES.CONTACT_DELETE_SUCCESS,
                    statusCode: RESPONSE_CODES.GET,
                    data: {}
                };
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

