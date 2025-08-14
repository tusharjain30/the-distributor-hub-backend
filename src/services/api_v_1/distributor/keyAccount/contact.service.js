import { ObjectId } from "mongodb";
import { RESPONSE } from "../../../../helpers/response.js";
import { COLLECTION_NAMES, RESPONSE_CODES, RESPONSE_MESSAGES } from "../../../../../config/constants.js";
import { findOne, insertOne, updateMany, updateOne } from "../../../../../config/dbMethods.js";
import moment from "moment-timezone";

export const KeyAccountContactDetail = async ({ type, _id, email, phone, createdBy, distributorId, accountId }) => {
    try {
        let response = RESPONSE;
        const account_contact_params = {
            isDeleted: false
        };
        let project = {};

        if (type === 'id') {
            account_contact_params._id = new ObjectId(_id);
        } else if (type === 'phone') {
            account_contact_params.phone = phone;
        } else if (type === 'limited_detail') {
            account_contact_params._id = new ObjectId(_id);
            project = {
                contactName: 1,
                email: 1,
                phone: 1,
                jobTitle: 1,
                isPrimary: 1,
            };
        } else if (type === "distributorId_accountId_createdBy") {
            account_contact_params._id = new ObjectId(_id);
            account_contact_params.distributorId = new ObjectId(distributorId);
            account_contact_params.createdBy = new ObjectId(createdBy);
            account_contact_params.accountId = new ObjectId(accountId);
            project = {
                contactName: 1,
                email: 1,
                phone: 1,
                jobTitle: 1,
                isPrimary: 1,
            };
        } else if (type === "email_not_equal") {
            account_contact_params.email = email.toLowerCase();
            account_contact_params._id = { $ne: new ObjectId(_id) };
        } else if (type === "phone_not_equal") {
            account_contact_params.phone = phone;
            account_contact_params._id = { $ne: new ObjectId(_id) };
        } else {
            account_contact_params.email = email.toLowerCase();
        };
        const contact_details = await findOne(COLLECTION_NAMES.KEY_ACCOUNT_CONTACT_COLLECTION, account_contact_params, project);
        if (contact_details) {
            response = {
                status: 1,
                message: RESPONSE_MESSAGES.ACCOUNT_CONTACT_DETAILS_FETCHED,
                statusCode: RESPONSE_CODES.GET,
                data: contact_details
            };
        } else {
            response = {
                status: 0,
                message: RESPONSE_MESSAGES.NO_DATA_FOUND,
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

export const addKeyAccountContactservice = async ({ contactName, jobTitle, email, phone, isPrimary, distributorId, accountId, createdBy }) => {
    try {
        let response = RESPONSE;
        const currentTime = parseInt(moment().tz(process.env.TIMEZONE).format("x"));
        distributorId = new ObjectId(distributorId);
        accountId = new ObjectId(accountId);
        createdBy = new ObjectId(createdBy);
        if (isPrimary) {
            await updateMany(COLLECTION_NAMES.KEY_ACCOUNT_CONTACT_COLLECTION, { accountId, distributorId, createdBy }, {
                $set: {
                    isPrimary: false
                }
            });
        };
        const result = await insertOne(COLLECTION_NAMES.KEY_ACCOUNT_CONTACT_COLLECTION, {
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
            await updateOne(COLLECTION_NAMES.DISTRIBUTOR_KEY_ACCOUNT_COLLECTION, { _id: accountId, distributorId, createdBy }, { $inc: { contacts: 1 } });
            response = {
                status: 1,
                message: RESPONSE_MESSAGES.CONTACT_ADDED,
                statusCode: RESPONSE_CODES.POST,
                data: { insertedId: result.insertedId }
            };
        } else {
            response = {
                status: 0,
                message: RESPONSE_MESSAGES.FAILED_TO_ADD_CONTACT,
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

        let result = await updateOne(COLLECTION_NAMES.KEY_ACCOUNT_CONTACT_COLLECTION, { _id: contactId, createdBy, distributorId, accountId }, {
            $set: {
                isDeleted: true,
                updatedAt: currentTime
            }
        });
        if (result.matchedCount === 0) {
            response = {
                status: 0,
                message: RESPONSE_MESSAGES.NO_DATA_FOUND,
                statusCode: RESPONSE_CODES.NOT_FOUND,
                data: {}
            };
        } else {
            await updateOne(COLLECTION_NAMES.DISTRIBUTOR_KEY_ACCOUNT_COLLECTION, { _id: accountId, createdBy, distributorId }, { $inc: { contacts: -1 } });
            response = {
                status: 1,
                message: RESPONSE_MESSAGES.CONTACT_DELETED,
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