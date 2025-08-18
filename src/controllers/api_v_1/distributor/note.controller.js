import { RESPONSE_CODES, RESPONSE_MESSAGES } from "../../../../config/constants.js"
import { RESPONSE } from "../../../helpers/response.js";
import { getDistributorDetails } from "../../../services/api_v_1/distributor/distributor.service.js";
import { addDistributorNoteService, deleteDistributorNoteService, distributorNoteListingService, getDistributorNoteDetails } from "../../../services/api_v_1/distributor/note.service.js";
import { getUserDetails } from "../../../services/api_v_1/user.service.js";

export const addNoteController = async (req, res) => {
    try {
        let response = RESPONSE;
        const user = req.user;
        const body = req.body;
        body.createdBy = user._id;
        let user_info = await getUserDetails({ queryType: "limited_detail", userId: body.createdBy });
        if (user_info.status) {
            let distributor_info = await getDistributorDetails({ queryType: "createdBy", _id: body.distributorId, createdBy: body.createdBy });
            if (distributor_info.status) {
                response = await addDistributorNoteService(body);
            } else {
                response = {
                    status: 0,
                    message: RESPONSE_MESSAGES.DISTRIBUTOR_NOT_FOUND,
                    statusCode: RESPONSE_CODES.NOT_FOUND,
                    data: {}
                };
            };
        } else {
            response = {
                status: 0,
                message: RESPONSE_MESSAGES.USER_NOT_FOUND,
                statusCode: RESPONSE_CODES.NOT_FOUND,
                data: {}
            };
        };
        res.status(response.statusCode).json(response);
    } catch (error) {
        res.status(RESPONSE_CODES.ERROR).json({
            status: 0,
            message: error.message,
            statusCode: RESPONSE_CODES.ERROR,
            data: {}
        });
    };
};

export const deleteNoteController = async (req, res) => {
    try {
        let response = RESPONSE;
        const user = req.user;
        const body = req.body;
        body.createdBy = user._id;
        let user_info = await getUserDetails({ queryType: "limited_detail", userId: body.createdBy });
        if (user_info.status) {
            let distributor_info = await getDistributorDetails({ queryType: "createdBy", _id: body.distributorId, createdBy: body.createdBy });
            if (distributor_info.status) {
                response = await getDistributorNoteDetails({ queryType: "createdBy", distributorId: body.distributorId, createdBy: body.createdBy, _id: body.noteId });
                if (response.status) {
                    response = await deleteDistributorNoteService(body);
                } else {
                    response = {
                        status: 0,
                        message: RESPONSE_MESSAGES.NOTE_NOT_FOUND,
                        statusCode: RESPONSE_CODES.NOT_FOUND,
                        data: {}
                    };
                };
            } else {
                response = {
                    status: 0,
                    message: RESPONSE_MESSAGES.DISTRIBUTOR_NOT_FOUND,
                    statusCode: RESPONSE_CODES.NOT_FOUND,
                    data: {}
                };
            };
        } else {
            response = {
                status: 0,
                message: RESPONSE_MESSAGES.USER_NOT_FOUND,
                statusCode: RESPONSE_CODES.NOT_FOUND,
                data: {}
            };
        };
        res.status(response.statusCode).json(response);
    } catch (error) {
        res.status(RESPONSE_CODES.ERROR).json({
            status: 0,
            message: error.message,
            status: RESPONSE_CODES.ERROR,
            data: {}
        });
    };
};

export const noteListingController = async (req, res) => {
    try {
        let response = RESPONSE;
        const user = req.user;
        const body = req.validatedQuery;
        body.createdBy = user._id;
        let user_info = await getUserDetails({ queryType: "limited_detail", userId: body.createdBy });
        if (user_info.status) {
            let distributor_info = await getDistributorDetails({ queryType: "createdBy", _id: body.distributorId, createdBy: body.createdBy });
            if (distributor_info.status) {
                response = await distributorNoteListingService(body);
            } else {
                response = {
                    status: 0,
                    message: RESPONSE_MESSAGES.DISTRIBUTOR_NOT_FOUND,
                    statusCode: RESPONSE_CODES.NOT_FOUND,
                    data: {}
                };
            };
        } else {
            response = {
                status: 0,
                message: RESPONSE_MESSAGES.USER_NOT_FOUND,
                statusCode: RESPONSE_CODES.NOT_FOUND,
                data: {}
            };
        };
        res.status(response.statusCode).json(response);
    } catch (error) {
        res.status(RESPONSE_CODES.ERROR).json({
            status: 0,
            message: error.message,
            status: RESPONSE_CODES.ERROR,
            data: {}
        });
    };
};