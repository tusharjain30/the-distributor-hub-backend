import { RESPONSE_CODES, RESPONSE_MESSAGES } from "../../../../config/constants.js"
import { RESPONSE } from "../../../helpers/response.js";
import { distributorDetail } from "../../../services/api_v_1/distributor/distributor.service.js";
import { addNoteService, deleteNoteService, noteDetail, noteListingService } from "../../../services/api_v_1/distributor/note.service.js";
import { userDetail } from "../../../services/api_v_1/user.service.js";

export const addNote = async (req, res) => {
    try {
        let response = RESPONSE;
        const user = req.user;
        const body = req.body;
        body.createdBy = user._id;
        let user_info = await userDetail({ type: "limited_detail", _id: body.createdBy });
        if (user_info.status) {
            let distributor_info = await distributorDetail({ type: "createdBy", _id: body.distributorId, createdBy: body.createdBy });
            if (distributor_info.status) {
                response = await addNoteService(body);
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

export const deleteNote = async (req, res) => {
    try {
        let response = RESPONSE;
        const user = req.user;
        const body = req.body;
        body.createdBy = user._id;
        let user_info = await userDetail({ type: "limited_detail", _id: body.createdBy });
        if (user_info.status) {
            let distributor_info = await distributorDetail({ type: "createdBy", _id: body.distributorId, createdBy: body.createdBy });
            if (distributor_info.status) {
                response = await noteDetail({ type: "createdBy", distributorId: body.distributorId, createdBy: body.createdBy, _id: body.noteId });
                if (response.status) {
                    response = await deleteNoteService(body);
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

export const noteListing = async (req, res) => {
    try {
        let response = RESPONSE;
        const user = req.user;
        const body = req.validatedQuery;
        body.createdBy = user._id;
        let user_info = await userDetail({ type: "limited_detail", _id: body.createdBy });
        if (user_info.status) {
            let distributor_info = await distributorDetail({ type: "createdBy", _id: body.distributorId, createdBy: body.createdBy });
            if (distributor_info.status) {
                response = await noteListingService(body);
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