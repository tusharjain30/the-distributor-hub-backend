import moment from "moment-timezone";
import { COLLECTION_NAMES, RESPONSE_CODES, RESPONSE_MESSAGES } from "../../../config/constants.js";
import { findOne, insertOne, updateOne } from "../../../config/dbMethods.js";
import { ObjectId } from "mongodb";

export const userDetail = async ({ type, _id, role, email }) => {
    try {
        let response = {
            status: 0,
            message: "",
            statusCode: RESPONSE_CODES.GET,
            data: {}
        };
        const user_params = {
            isDeleted: false
        };
        const project = {};

        if (type === 'id') {
            user_params._id = new ObjectId(_id);
            project.refreshToken = 0;
        } else if (type === 'role') {
            user_params.role = role;
        } else if (type === 'limited_detail') {
            user_params._id = new ObjectId(_id);
            project._id = 1;
            project.name = 1;
            project.role = 1;
            project.email = 1;
        } else {
            user_params.email = email.toLowerCase();
        };
        const user_details = await findOne(COLLECTION_NAMES.USER_COLLECTION, user_params, project);
        if (user_details) {
            response.status = 1;
            response.message = RESPONSE_MESSAGES.USER_DETAIL;
            response.data = user_details;
        } else {
            response.message = RESPONSE_MESSAGES.NO_DATA_FOUND;
            response.statusCode = RESPONSE_CODES.NOT_FOUND;
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
        let response = {
            status: 0,
            message: "",
            statusCode: RESPONSE_CODES.GET,
            data: {}
        };
        const currentTime = parseInt(moment().tz(process.env.TIMEZONE).format("x"));
        let conditions = {
            name,
            email,
            role,
            refreshToken: "",
            status: 0,
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
            response.status = 1;
            response.message = RESPONSE_MESSAGES.REGISTER_SUCCESS;
            response.statusCode = RESPONSE_CODES.POST;
            response.data = { insertedId: result.insertedId };
        } else {
            response.message = RESPONSE_MESSAGES.USER_FAILED_TO_REGISTER;
            response.statusCode = RESPONSE_CODES.BAD_REQUEST;
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
        let response = {
            status: 0,
            message: "",
            statusCode: RESPONSE_CODES.GET,
            data: {}
        };
        const currentTime = parseInt(moment().tz(process.env.TIMEZONE).format("x"));
        const result = await updateOne(COLLECTION_NAMES.USER_COLLECTION, { _id }, { refreshToken: refresh_token, status: 1, updatedAt: currentTime });
        if (result.matchedCount === 0) {
            response.message = RESPONSE_MESSAGES.NO_DATA_FOUND;
            response.statusCode = RESPONSE_CODES.NOT_FOUND;
        } else {
            response.status = 1;
            response.message = RESPONSE_MESSAGES.LOGIN_SUCCESS;
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

export const updateProfileService = async ({ _id, name, email }) => {
    try {
        let response = {
            status: 0,
            message: "",
            statusCode: RESPONSE_CODES.GET,
            data: {}
        };
        const currentTime = parseInt(moment().tz(process.env.TIMEZONE).format("x"));
        const conditions = {
            updatedAt: currentTime
        };
        if (name) {
            conditions.name = name;
        };
        if (email) {
            conditions.email = email;
        };
        const result = await updateOne(COLLECTION_NAMES.USER_COLLECTION, { _id: new ObjectId(_id) }, conditions);
        if (result.matchedCount === 0) {
            response.message = RESPONSE_MESSAGES.NO_DATA_FOUND;
            response.statusCode = RESPONSE_CODES.NOT_FOUND;
        } else {
            response.status = 1;
            response.message = RESPONSE_MESSAGES.PROFILE_UPDATED;
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
