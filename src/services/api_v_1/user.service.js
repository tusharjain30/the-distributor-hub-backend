import moment from "moment-timezone";
import { COLLECTION_NAMES, RESPONSE_CODES, RESPONSE_MESSAGES } from "../../../config/constants.js";
import { findOneDocument, insertDocument, updateDocument } from "../../../config/dbMethods.js";
import { ObjectId } from "mongodb";
import { RESPONSE } from "../../helpers/response.js";

export const getUserDetails = async ({ queryType, userId, role, email }) => {
    try {
        let response = RESPONSE;
        const queryFilter = {
            isDeleted: false
        };
        let projection = {};

        if (queryType === 'byId') {
            queryFilter._id = new ObjectId(userId);
            projection = {
                refreshToken: 0
            };
        } else if (queryType === 'byRole') {
            queryFilter.role = role;
        } else if (queryType === 'limited_detail') {
            queryFilter._id = new ObjectId(userId);
            projection = {
                _id: 1,
                name: 1,
                role: 1,
                email: 1,
                regions: 1,
                distributorId: 1
            };
        } else if (queryType === "emailNotEqual") {
            queryFilter.email = email.toLowerCase();
            queryFilter._id = { $ne: new ObjectId(userId) };
        } else {
            queryFilter.email = email.toLowerCase();
        };

        const user_details = await findOneDocument(COLLECTION_NAMES.USERS, queryFilter, projection);
        if (user_details) {
            response = {
                status: 1,
                message: RESPONSE_MESSAGES.USER_FETCH_SUCCESS,
                statusCode: RESPONSE_CODES.GET,
                data: user_details
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

export const registerService = async ({ name, email, role, regions, distributorId }) => {
    try {
        let response = RESPONSE;
        const currentTime = parseInt(moment().tz(process.env.TIMEZONE).format("x"));
        let conditions = {
            name,
            email,
            role,
            refreshToken: "",
            status: 0,
            password: null,
            isDeleted: false,
            createdAt: currentTime,
            updatedAt: currentTime
        };
        if (regions) {
            conditions.regions = regions.map(_id => new ObjectId(_id));
        } else if (distributorId) {
            conditions.distributorId = new ObjectId(distributorId);
        };
        const result = await insertDocument(COLLECTION_NAMES.USERS, conditions);
        if (result.acknowledged) {
            response = {
                status: 1,
                message: RESPONSE_MESSAGES.USER_REGISTER_SUCCESS,
                statusCode: RESPONSE_CODES.POST,
                data: { insertedId: result.insertedId }
            };
        } else {
            response = {
                status: 0,
                message: RESPONSE_MESSAGES.USER_REGISTER_FAILED,
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

export const loginService = async ({ _id, refresh_token }) => {
    try {
        let response = RESPONSE;
        const currentTime = parseInt(moment().tz(process.env.TIMEZONE).format("x"));
        const result = await updateDocument(COLLECTION_NAMES.USERS, { _id: new ObjectId(_id) }, { $set: { refreshToken: refresh_token, status: 1, updatedAt: currentTime } });
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
                message: RESPONSE_MESSAGES.LOGIN_SUCCESS,
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

export const updateProfileService = async ({ _id, name, email, regions, distributorId }) => {
    try {
        let response = RESPONSE;
        const currentTime = parseInt(moment().tz(process.env.TIMEZONE).format("x"));
        const conditions = {
            name,
            email,
            updatedAt: currentTime
        };
        if (regions) {
            conditions.regions = regions.map(_id => new ObjectId(_id));
        } else if (distributorId) {
            conditions.distributorId = new ObjectId(distributorId);
        };
        const result = await updateDocument(COLLECTION_NAMES.USERS, { _id: new ObjectId(_id) }, { $set: conditions });
        if (result.matchedCount === 0) {
            response = {
                status: 0,
                message: RESPONSE_MESSAGES.USER_UPDATE_FAILED,
                statusCode: RESPONSE_CODES.BAD_REQUEST,
                data: {}
            };
        } else {
            response = {
                status: 1,
                message: RESPONSE_MESSAGES.USER_UPDATE_SUCCESS,
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
