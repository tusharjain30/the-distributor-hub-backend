import moment from "moment-timezone";
import { COLLECTION_NAMES, RESPONSE_CODES, RESPONSE_MESSAGES } from "../../../../config/constants.js";
import { findOne, insertOne, updateOne } from "../../../../config/dbMethods.js";
import { RESPONSE } from "../../../helpers/response.js";
import { ObjectId } from "mongodb";

export const keyAccountDetail = async ({ type, _id, email, phone }) => {
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
                _id: 1,
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

