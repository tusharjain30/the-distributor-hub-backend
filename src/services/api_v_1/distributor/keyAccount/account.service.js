import moment from "moment-timezone";
import { ObjectId } from "mongodb";
import { RESPONSE } from "../../../../helpers/response.js";
import { COLLECTION_NAMES, RESPONSE_CODES, RESPONSE_MESSAGES } from "../../../../../config/constants.js";
import { find, findOne, insertOne, updateOne } from "../../../../../config/dbMethods.js";

export const keyAccountDetail = async ({ type, _id, email, phone, distributorId, createdBy }) => {
    try {
        let response = RESPONSE;
        const key_account_params = {
            isDeleted: false
        };
        let project = {};

        if (type === 'id') {
            key_account_params._id = new ObjectId(_id);
        } else if (type === 'phone') {
            key_account_params.phone = phone;
        } else if (type === 'limited_detail') {
            key_account_params._id = new ObjectId(_id);
            project = {
                contactName: 1,
                companyName: 1,
                email: 1,
                phone: 1,
                value: 1,
                status: 1,
                regions: 1,
                adoptionLevel: 1,
                lastContact: 1,
                distributor: 1,
                notes: 1,
                contacts: 1
            };
        } else if (type === "distributorId_createdBy") {
            key_account_params._id = new ObjectId(_id);
            key_account_params.distributorId = new ObjectId(distributorId);
            key_account_params.createdBy = new ObjectId(createdBy);
            project = {
                contactName: 1,
                companyName: 1,
                email: 1,
                phone: 1,
                value: 1,
                status: 1,
                regions: 1,
                adoptionLevel: 1,
                lastContact: 1,
                distributor: 1,
                notes: 1,
                contacts: 1
            };
        } else if (type === "email_not_equal") {
            key_account_params.email = email.toLowerCase();
            key_account_params._id = { $ne: new ObjectId(_id) };
        } else if (type === "phone_not_equal") {
            key_account_params.phone = phone;
            key_account_params._id = { $ne: new ObjectId(_id) };
        } else {
            key_account_params.email = email.toLowerCase();
        };
        const account_details = await findOne(COLLECTION_NAMES.DISTRIBUTOR_KEY_ACCOUNT_COLLECTION, key_account_params, project);
        if (account_details) {
            response = {
                status: 1,
                message: RESPONSE_MESSAGES.ACCOUNT_DETAILS_FETCHED,
                statusCode: RESPONSE_CODES.GET,
                data: account_details
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

export const addKeyAccountService = async ({ contactName, companyName, email, phone, value, status, region, adoptionLevel, lastContact, distributor, createdBy, distributorId }) => {
    try {
        let response = RESPONSE;
        const currentTime = parseInt(moment().tz(process.env.TIMEZONE).format("x"));
        createdBy = new ObjectId(createdBy);
        distributorId = new ObjectId(distributorId);
        const accountData = {
            contactName,
            companyName,
            email,
            phone,
            value,
            status,
            region,
            adoptionLevel,
            lastContact,
            distributor,
            createdBy,
            distributorId,
            contacts: 0,
            notes: 0,
            updatedBy: null,
            isDeleted: false,
            createdAt: currentTime,
            updatedAt: currentTime
        };

        const result = await insertOne(COLLECTION_NAMES.DISTRIBUTOR_KEY_ACCOUNT_COLLECTION, accountData);
        if (result.acknowledged) {
            await updateOne(COLLECTION_NAMES.DISTRIBUTOR_COLLECTION, { _id: distributorId, createdBy }, { $inc: { key_accounts: 1 } });
            response = {
                status: 1,
                message: RESPONSE_MESSAGES.ACCOUNT_ADDED,
                statusCode: RESPONSE_CODES.POST,
                data: { insertedId: result.insertedId }
            };
        } else {
            response = {
                status: 0,
                message: RESPONSE_MESSAGES.FAILED_TO_ADD_ACCOUNT,
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

export const keyAccountListingService = async ({ createdBy, distributorId, search, region, status, distributor, page, limit }) => {
    try {
        let response = RESPONSE;

        let filter = {
            distributorId: new ObjectId(distributorId),
            createdBy: new ObjectId(createdBy),
            isDeleted: false
        };

        if (search) {
            filter.$or = [
                { companyName: { $regex: search, $options: "i" } },
                { contactName: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
            ];
        };

        if (region && region.toLowerCase() !== "all") {
            filter.region = { $regex: region, $options: "i" };
        };

        if (status && status.toLowerCase() !== "all") {
            filter.status = status;
        };

        if (distributor && distributor.toLowerCase() !== "all") {
            filter["distributor"] = { $regex: distributor, $options: "i" };
        };
        const result = await find(COLLECTION_NAMES.DISTRIBUTOR_KEY_ACCOUNT_COLLECTION, filter, {
            contactName: 1,
            companyName: 1,
            email: 1,
            phone: 1,
            value: 1,
            region: 1,
            status: 1,
            adoptionLevel: 1,
            lastContact: 1,
            distributor: 1,
            contacts: 1,
            notes: 1,
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

export const deleteKeyAccountService = async ({ distributorId, createdBy, accountId }) => {
    try {
        let response = RESPONSE;
        const currentTime = parseInt(moment().tz(process.env.TIMEZONE).format("x"));
        distributorId = new ObjectId(distributorId);
        createdBy = new ObjectId(createdBy);
        accountId = new ObjectId(accountId);
        let result = await updateOne(COLLECTION_NAMES.DISTRIBUTOR_KEY_ACCOUNT_COLLECTION, { _id: accountId, createdBy, distributorId }, {
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
            await updateOne(COLLECTION_NAMES.DISTRIBUTOR_COLLECTION, { _id: distributorId, createdBy }, { $inc: { key_accounts: -1 } });
            response = {
                status: 1,
                message: RESPONSE_MESSAGES.ACCOUNT_DELETED,
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

export const updateKeyAccountService = async ({ distributorId, accountId, createdBy, contactName, companyName, email, phone, value, status, region, adoptionLevel, lastContact, distributor, updatedBy }) => {
    try {
        let response = RESPONSE;
        const currentTime = parseInt(moment().tz(process.env.TIMEZONE).format("x"));
        const result = await updateOne(COLLECTION_NAMES.DISTRIBUTOR_KEY_ACCOUNT_COLLECTION, {
            _id: new ObjectId(accountId),
            distributorId: new ObjectId(distributorId),
            createdBy: new ObjectId(createdBy)
        }, {
            $set: {
                contactName,
                companyName,
                email,
                phone,
                value,
                status,
                region,
                adoptionLevel,
                lastContact,
                distributor,
                updatedBy: new ObjectId(updatedBy),
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
            response = {
                status: 1,
                message: RESPONSE_MESSAGES.ACCOUNT_DETAILS_UPDATED,
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

