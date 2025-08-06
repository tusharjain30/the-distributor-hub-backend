import { ObjectId } from "mongodb";
import { COLLECTION_NAMES, RESPONSE_CODES, RESPONSE_MESSAGES } from "../../../../config/constants.js";
import { find, findOne, insertOne, updateMany, updateOne } from "../../../../config/dbMethods.js";
import { RESPONSE } from "../../../helpers/response.js";
import moment from "moment-timezone";

export const contactDetail = async ({ type, _id, email, phone }) => {
    try {
        let response = RESPONSE;
        const user_params = {
            isDeleted: false
        };
        let project = {};

        if (type === 'id') {
            user_params._id = new ObjectId(_id);
        } else if (type === 'phone') {
            user_params.phone = phone;
        } else if (type === 'limited_detail') {
            user_params._id = new ObjectId(_id);
            project = {
                _id: 1,
                name: 1,
                phone: 1,
                email: 1,
                title: 1,
                distributorId: 1,
                manufacturerId: 1
            }
        } else if (type === "email_not_equal") {
            user_params.email = email.toLowerCase();
            user_params._id = { $ne: new ObjectId(_id) };
        } else if (type === "phone_not_equal") {
            user_params.phone = phone;
            user_params._id = { $ne: new ObjectId(_id) };
        } else {
            user_params.email = email.toLowerCase();
        };
        const user_details = await findOne(COLLECTION_NAMES.DISTRIBUTOR_CONTACT_COLLECTION, user_params, project);
        if (user_details) {
            response = {
                status: 1,
                message: RESPONSE_MESSAGES.USER_DETAIL,
                statusCode: RESPONSE_CODES.GET,
                data: user_details
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

export const addContactService = async ({ name, title, email, phone, isPrimary, manufacturerId, distributorId }) => {
    try {
        let response = RESPONSE;
        const currentTime = parseInt(moment().tz(process.env.TIMEZONE).format("x"));
        manufacturerId = new ObjectId(manufacturerId);
        distributorId = new ObjectId(distributorId);
        const contactData = {
            name,
            title,
            email,
            phone,
            manufacturerId,
            distributorId,
            isDeleted: false,
            createdAt: currentTime,
            updatedAt: currentTime
        };
        const contact = await find(COLLECTION_NAMES.DISTRIBUTOR_CONTACT_COLLECTION, { manufacturerId, distributorId }, {
            name: 1,
            title: 1,
            email: 1,
            phone: 1,
            isPrimary: 1,
            manufacturerId: 1,
            distributorId: 1
        });
        if (contact && contact.length === 0) {
            contactData.isPrimary = true;
        } else if (contact.length !== 0 && isPrimary) {
            await updateMany(COLLECTION_NAMES.DISTRIBUTOR_CONTACT_COLLECTION, { distributorId, manufacturerId }, { isPrimary: false });
            contactData.isPrimary = isPrimary;
        } else {
            contactData.isPrimary = false;
        };
        const result = await insertOne(COLLECTION_NAMES.DISTRIBUTOR_CONTACT_COLLECTION, contactData);
        if (result.acknowledged) {
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

export const makeContactPrimaryService = async ({ manufacturerId, distributorId, contactId }) => {
    try {
        let response = RESPONSE;
        const currentTime = parseInt(moment().tz(process.env.TIMEZONE).format("x"));
        manufacturerId = new ObjectId(manufacturerId);
        distributorId = new ObjectId(distributorId);
        contactId = new ObjectId(contactId);
        await updateMany(COLLECTION_NAMES.DISTRIBUTOR_CONTACT_COLLECTION, { distributorId, manufacturerId }, { isPrimary: false });
        const result = await updateOne(COLLECTION_NAMES.DISTRIBUTOR_CONTACT_COLLECTION, { _id: contactId, manufacturerId, distributorId }, {
            isPrimary: true,
            updatedAt: currentTime
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
                message: RESPONSE_MESSAGES.SUCCESSFULLY_MARKED_CONTACT_AS_PRIMARY,
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

export const contactListingService = async ({ manufacturerId, distributorId }) => {
    try {
        let response = RESPONSE;
        manufacturerId = new ObjectId(manufacturerId);
        distributorId = new ObjectId(distributorId);
        const result = await find(COLLECTION_NAMES.DISTRIBUTOR_CONTACT_COLLECTION, { manufacturerId, distributorId }, {
            name: 1,
            title: 1,
            email: 1,
            phone: 1,
            isPrimary: 1,
            manufacturerId: 1,
            distributorId: 1
        });
        response = {
            status: 1,
            message: RESPONSE_MESSAGES.FETCHED,
            statusCode: RESPONSE_CODES.GET,
            data: result
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

export const deleteContactService = async ({ manufacturerId, distributorId, contactId }) => {
    try {
        let response = RESPONSE;
        manufacturerId = new ObjectId(manufacturerId);
        distributorId = new ObjectId(distributorId);
        contactId = new ObjectId(contactId);
        const currentTime = parseInt(moment().tz(process.env.TIMEZONE).format("x"));
        // let result = await find(COLLECTION_NAMES.DISTRIBUTOR_CONTACT_COLLECTION, { manufacturerId, distributorId });
        result = await updateOne(COLLECTION_NAMES.DISTRIBUTOR_CONTACT_COLLECTION, { _id: contactId, manufacturerId, distributorId }, {
            isDeleted: true,
            updatedAt: currentTime
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

