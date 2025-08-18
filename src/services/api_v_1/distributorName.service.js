import { ObjectId } from "mongodb";
import { COLLECTION_NAMES, RESPONSE_CODES, RESPONSE_MESSAGES } from "../../../config/constants.js";
import { RESPONSE } from "../../helpers/response.js";
import { findOneDocument } from "../../../config/dbMethods.js";

export const getDistributorNameById = async ({ _id }) => {
    try {
        let response = RESPONSE;
        const queryFilter = {
            _id: new ObjectId(_id),
            isDeleted: false
        };
        let projection = {
            distributor: 1
        };
        const distributor_details = await findOneDocument(COLLECTION_NAMES.DISTRIBUTOR_NAMES, queryFilter, projection);

        if (distributor_details) {
            response = {
                status: 1,
                message: RESPONSE_MESSAGES.DISTRIBUTOR_NAME_FETCH_SUCCESS,
                statusCode: RESPONSE_CODES.GET,
                data: distributor_details
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