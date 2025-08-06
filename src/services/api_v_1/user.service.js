import moment from "moment-timezone";
import { COLLECTION_NAMES, RESPONSE_CODES, RESPONSE_MESSAGES } from "../../../config/constants.js";
import { findOne, insertOne, updateOne } from "../../../config/dbMethods.js";
import { ObjectId } from "mongodb";
import { refreshToken } from "../../helpers/jwt.js";
import { RESPONSE } from "../../helpers/response.js";

export const userDetail = async ({ type, _id, role, email }) => {
    try {
        let response = RESPONSE;
        const user_params = {
            isDeleted: false
        };
        let project = {};

        if (type === 'id') {
            user_params._id = new ObjectId(_id);
            project = {
                refreshToken: 0
            };
        } else if (type === 'role') {
            user_params.role = role;
        } else if (type === 'limited_detail') {
            user_params._id = new ObjectId(_id);
            project = {
                _id: 1,
                name: 1,
                role: 1,
                email: 1,
                regions: 1,
                distributorId: 1
            };
        } else if (type === "email_not_equal") {
            user_params.email = email.toLowerCase();
            user_params._id = { $ne: new ObjectId(_id) };
        } else {
            user_params.email = email.toLowerCase();
        };
        const user_details = await findOne(COLLECTION_NAMES.USER_COLLECTION, user_params, project);
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
            conditions.regions = regions;
        } else if (distributorId) {
            conditions.distributorId = distributorId;
        };
        const result = await insertOne(COLLECTION_NAMES.USER_COLLECTION, conditions);
        if (result.acknowledged) {
            response = {
                status: 1,
                message: RESPONSE_MESSAGES.REGISTER_SUCCESS,
                statusCode: RESPONSE_CODES.POST,
                data: { insertedId: result.insertedId }
            };
        } else {
            response = {
                status: 0,
                message: RESPONSE_MESSAGES.USER_FAILED_TO_REGISTER,
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
        const result = await updateOne(COLLECTION_NAMES.USER_COLLECTION, { _id }, { refreshToken: refresh_token, status: 1, updatedAt: currentTime });
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
            conditions.regions = regions;
        };
        if (distributorId) {
            conditions.distributorId = distributorId;
        };
        const result = await updateOne(COLLECTION_NAMES.USER_COLLECTION, { _id: new ObjectId(_id) }, conditions);
        if (result.matchedCount === 0) {
            response = {
                status: 0,
                message: RESPONSE_MESSAGES.FAILED_TO_UPDATE_PROFILE,
                statusCode: RESPONSE_CODES.BAD_REQUEST,
                data: {}
            };
        } else {
            response = {
                status: 1,
                message: RESPONSE_MESSAGES.PROFILE_UPDATED,
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
