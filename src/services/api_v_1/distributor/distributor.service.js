import moment from "moment-timezone";
import { ObjectId } from "mongodb";
import { COLLECTION_NAMES, RESPONSE_CODES, RESPONSE_MESSAGES } from "../../../../config/constants.js";
import { find, findOne, insertOne, updateOne } from "../../../../config/dbMethods.js";
import { RESPONSE } from "../../../helpers/response.js";

export const distributorDetail = async ({ type, _id, email, phone, createdBy }) => {
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
        } else if (type === "created_by") {
            user_params.createdBy = createdBy;
        } else if (type === 'limited_detail') {
            user_params._id = new ObjectId(_id);
            project = {
                _id: 1,
                name: 1,
                phone: 1,
                email: 1,
                website: 1,
                country: 1,
                status: 1,
                region: 1
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
        const user_details = await findOne(COLLECTION_NAMES.DISTRIBUTOR_COLLECTION, user_params, project);
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

export const addDistributorService = async ({ createdBy, name, email, phone, website = "", region, country, status, annualRevenue }) => {
    try {
        let response = RESPONSE;
        const currentTime = parseInt(moment().tz(process.env.TIMEZONE).format("x"));
        const result = await insertOne(COLLECTION_NAMES.DISTRIBUTOR_COLLECTION, {
            name,
            email,
            phone,
            website,
            region,
            country,
            status,
            annualRevenue,
            createdBy: new ObjectId(createdBy),
            isDeleted: false,
            createdAt: currentTime,
            updatedAt: currentTime
        });
        if (result.acknowledged) {
            response = {
                status: 1,
                message: RESPONSE_MESSAGES.DISTRIBUTOR_ADDED,
                statusCode: RESPONSE_CODES.POST,
                data: { insertedId: result.insertedId }
            };
        } else {
            response = {
                status: 0,
                message: RESPONSE_MESSAGES.FAILED_TO_ADD_DISTRIBUTOR,
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

export const updateDistributorService = async ({ distributorId, name, email, phone, website = "", region, country, status, annualRevenue }) => {
    try {
        let response = RESPONSE;
        const currentTime = parseInt(moment().tz(process.env.TIMEZONE).format("x"));
        const result = await updateOne(COLLECTION_NAMES.DISTRIBUTOR_COLLECTION, { _id: new ObjectId(distributorId) }, {
            name,
            email,
            phone,
            website,
            region,
            country,
            status,
            annualRevenue,
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
                message: RESPONSE_MESSAGES.DISTRIBUTOR_DETAILS_UPDATED,
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

export const deleteDistributorService = async ({ distributorId }) => {
    try {
        let response = RESPONSE;
        const currentTime = parseInt(moment().tz(process.env.TIMEZONE).format("x"));
        const result = await updateOne(COLLECTION_NAMES.DISTRIBUTOR_COLLECTION, { _id: new ObjectId(distributorId) }, {
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
                message: RESPONSE_MESSAGES.DISTRIBUTOR_DELETED,
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

export const distributorListingService = async ({ page, limit, name, email, country, region, status, userId }) => {
    try {
        let response = RESPONSE;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        let conditions = {
            createdBy: new ObjectId(userId),
            isDeleted: false
        };
        if (name) {
            conditions.name = { $regex: name, $options: "i" };
        } if (email) {
            conditions.email = { $regex: email, $options: "i" };
        } if (country) {
            conditions.country = { $regex: country, $options: "i" };
        } if (region) {
            conditions.region = { $regex: region, $options: "i" };
        } if (status) {
            conditions.status = { $regex: status, $options: "i" };
        };
        const result = await find(COLLECTION_NAMES.DISTRIBUTOR_COLLECTION, conditions, {
            name: 1,
            email: 1,
            phone: 1,
            website: 1,
            region: 1,
            country: 1,
            status: 1,
            annualRevenue: 1
        }, page, limit);
        response = {
            status: 1,
            message: RESPONSE_MESSAGES.FETCHED,
            statusCode: RESPONSE_CODES.GET,
            data: [...result, { page, limit }]
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
