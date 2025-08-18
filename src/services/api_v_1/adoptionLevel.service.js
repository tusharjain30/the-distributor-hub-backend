import { ObjectId } from "mongodb";
import { COLLECTION_NAMES, RESPONSE_CODES, RESPONSE_MESSAGES } from "../../../config/constants.js";
import { RESPONSE } from "../../helpers/response.js";
import { findOneDocument } from "../../../config/dbMethods.js";

export const getAdoptionLevelById = async ({ levelId }) => {
    try {
        let response = RESPONSE;
        const queryFilter = {
            _id: new ObjectId(levelId),
            isDeleted: false 
        };
        let projection = {
            level: 1
        };
        const adoptionLevel_details = await findOneDocument(COLLECTION_NAMES.ADOPTION_LEVELS, queryFilter, projection);
        if (adoptionLevel_details) {
            response = {
                status: 1,
                message: RESPONSE_MESSAGES.ADOPTION_LEVEL_FETCH_SUCCESS,
                statusCode: RESPONSE_CODES.GET,
                data: adoptionLevel_details
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