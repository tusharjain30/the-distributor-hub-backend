import { ObjectId } from "mongodb";
import { COLLECTION_NAMES, RESPONSE_CODES, RESPONSE_MESSAGES } from "../../../config/constants.js";
import { RESPONSE } from "../../helpers/response.js";
import { findOneDocument } from "../../../config/dbMethods.js";

export const getStatusById = async ({ statusId }) => {
    try {
        let response = RESPONSE;
        const queryFilter = {
            _id: new ObjectId(statusId),
            isDeleted: false
        };
        let projection = {
            status: 1
        };
        const status_details = await findOneDocument(COLLECTION_NAMES.STATUS, queryFilter, projection);
        if (status_details) {
            response = {
                status: 1,
                message: RESPONSE_MESSAGES.STATUS_FETCH_SUCCESS,
                statusCode: RESPONSE_CODES.GET,
                data: status_details
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