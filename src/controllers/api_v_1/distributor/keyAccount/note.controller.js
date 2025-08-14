import { RESPONSE_CODES } from "../../../../../config/constants.js";
import { RESPONSE } from "../../../../helpers/response.js";
import { distributorDetail } from "../../../../services/api_v_1/distributor/distributor.service.js";
import { keyAccountDetail } from "../../../../services/api_v_1/distributor/keyAccount/account.service.js";
import { addAccountNoteService } from "../../../../services/api_v_1/distributor/keyAccount/note.service.js";
import { userDetail } from "../../../../services/api_v_1/user.service.js";

export const addAccountNote = async (req, res) => {
    try {
        let response = RESPONSE;
        const user = req.user;
        const body = req.body;
        body.createdBy = user._id;
        let user_info = await userDetail({ type: "limited_detail", _id: body.createdBy });
        if (user_info.status) {
            let distributor_info = await distributorDetail({ type: "createdBy", _id: body.distributorId, createdBy: user._id });
            if (!distributor_info.status) {
                response = {
                    status: 0,
                    message: RESPONSE_MESSAGES.DISTRIBUTOR_NOT_FOUND,
                    statusCode: RESPONSE_CODES.NOT_FOUND,
                    data: {}
                };
            } else {
                let account_info = await keyAccountDetail({ type: "distributorId_createdBy", _id: body.accountId, distributorId: body.distributorId, createdBy: body.createdBy });
                if (account_info.status) {
                    response = await addAccountNoteService(body);
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

export const deleteAccountNote = async (req, res) => {
    try {
        let response = RESPONSE;
        const user = req.user;
        const body = req.body;
        body.createdBy = user._id;
        let user_info = await userDetail({ type: "limited_detail", _id: body.createdBy });
        if (user_info.status) {
            let distributor_info = await distributorDetail({ type: "createdBy", _id: body.distributorId, createdBy: user._id });
            if (!distributor_info.status) {
                response = {
                    status: 0,
                    message: RESPONSE_MESSAGES.DISTRIBUTOR_NOT_FOUND,
                    statusCode: RESPONSE_CODES.NOT_FOUND,
                    data: {}
                };
            } else {
                let account_info = await keyAccountDetail({ type: "distributorId_createdBy", _id: body.accountId, distributorId: body.distributorId, createdBy: body.createdBy });
                if (account_info.status) {
                    //.. delete service
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