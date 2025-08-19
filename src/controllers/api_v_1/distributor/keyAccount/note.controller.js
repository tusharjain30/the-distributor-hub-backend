import { RESPONSE_CODES, RESPONSE_MESSAGES } from "../../../../../config/constants.js";
import { RESPONSE } from "../../../../helpers/response.js";
import { getDistributorDetails } from "../../../../services/api_v_1/distributor/distributor.service.js";
import { getDistributorkeyAccountDetails } from "../../../../services/api_v_1/distributor/keyAccount/account.service.js";
import { addKeyAccountNoteService, deleteKeyAccountNoteService, getKeyAccountNoteDetails, keyAccountNoteListingService } from "../../../../services/api_v_1/distributor/keyAccount/note.service.js";
import { getUserDetails } from "../../../../services/api_v_1/user.service.js";

export const addKeyAccountNoteController = async (req, res) => {
    try {
        let response = RESPONSE;
        const user = req.user;
        const body = req.body;
        body.createdBy = user._id;
        let user_info = await getUserDetails({ queryType: "limited_detail", userId: body.createdBy });
        if (user_info.status) {
            let distributor_info = await getDistributorDetails({ queryType: "createdBy", _id: body.distributorId, createdBy: user._id });
            if (!distributor_info.status) {
                response = {
                    status: 0,
                    message: RESPONSE_MESSAGES.DISTRIBUTOR_NOT_FOUND,
                    statusCode: RESPONSE_CODES.NOT_FOUND,
                    data: {}
                };
            } else {
                let account_info = await getDistributorkeyAccountDetails({ queryType: "distributorId_createdBy", _id: body.accountId, distributorId: body.distributorId, createdBy: body.createdBy });
                if (account_info.status) {
                    response = await addKeyAccountNoteService(body);
                } else {
                    response = {
                        status: 0,
                        message: RESPONSE_MESSAGES.ACCOUNT_NOT_FOUND,
                        statusCode: RESPONSE_CODES.NOT_FOUND,
                        data: {}
                    };
                }
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

export const deleteKeyAccountNoteController = async (req, res) => {
    try {
        let response = RESPONSE;
        const user = req.user;
        const body = req.body;
        body.createdBy = user._id;
        let user_info = await getUserDetails({ queryType: "limited_detail", userId: body.createdBy });
        if (user_info.status) {
            let distributor_info = await getDistributorDetails({ queryType: "createdBy", _id: body.distributorId, createdBy: user._id });
            if (!distributor_info.status) {
                response = {
                    status: 0,
                    message: RESPONSE_MESSAGES.DISTRIBUTOR_NOT_FOUND,
                    statusCode: RESPONSE_CODES.NOT_FOUND,
                    data: {}
                };
            } else {
                let account_info = await getDistributorkeyAccountDetails({ queryType: "distributorId_createdBy", _id: body.accountId, distributorId: body.distributorId, createdBy: body.createdBy });
                if (account_info.status) {
                    let note_info = await getKeyAccountNoteDetails({ queryType: "distributorId_accountId_createdBy", _id: body.noteId, distributorId: body.distributorId, accountId: body.accountId, createdBy: body.createdBy });
                    if (note_info.status) {
                        response = await deleteKeyAccountNoteService({ distributorId: body.distributorId, accountId: body.accountId, noteId: body.noteId, createdBy: body.createdBy });
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
                        message: RESPONSE_MESSAGES.ACCOUNT_NOT_FOUND,
                        statusCode: RESPONSE_CODES.NOT_FOUND,
                        data: {}
                    };
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

export const keyAccountNoteListingController = async (req, res) => {
    try {
        let response = RESPONSE;
        const user = req.user;
        const body = req.validatedQuery;
        body.createdBy = user._id;
        let user_info = await getUserDetails({ queryType: "limited_detail", userId: body.createdBy });
        if (user_info.status) {
            let distributor_info = await getDistributorDetails({ queryType: "createdBy", _id: body.distributorId, createdBy: user._id });
            if (!distributor_info.status) {
                response = {
                    status: 0,
                    message: RESPONSE_MESSAGES.DISTRIBUTOR_NOT_FOUND,
                    statusCode: RESPONSE_CODES.NOT_FOUND,
                    data: {}
                };
            } else {
                let account_info = await getDistributorkeyAccountDetails({ queryType: "distributorId_createdBy", _id: body.accountId, distributorId: body.distributorId, createdBy: body.createdBy });
                if (account_info.status) {
                    response = await keyAccountNoteListingService(body)
                } else {
                    response = {
                        status: 0,
                        message: RESPONSE_MESSAGES.ACCOUNT_NOT_FOUND,
                        statusCode: RESPONSE_CODES.NOT_FOUND,
                        data: {}
                    };
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