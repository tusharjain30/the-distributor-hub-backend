import { RESPONSE_CODES, RESPONSE_MESSAGES } from "../../../../../config/constants.js";
import { RESPONSE } from "../../../../helpers/response.js";
import { distributorDetail } from "../../../../services/api_v_1/distributor/distributor.service.js";
import { keyAccountDetail } from "../../../../services/api_v_1/distributor/keyAccount/account.service.js";
import { addKeyAccountContactservice, deleteKeyAccountContactService, KeyAccountContactDetail } from "../../../../services/api_v_1/distributor/keyAccount/contact.service.js";
import { userDetail } from "../../../../services/api_v_1/user.service.js";

export const addKeyAccountContactController = async (req, res) => {
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
                    let contact_email = await KeyAccountContactDetail({ email: body.email });
                    let contact_phone = await KeyAccountContactDetail({ type: "phone", phone: body.phone });
                    if (contact_email.status) {
                        response = {
                            status: 0,
                            message: RESPONSE_MESSAGES.CONTACT_EMAIL_IS_ALREADY_Exists,
                            statusCode: RESPONSE_CODES.ALREADY_EXIST,
                            data: {}
                        };
                    } else if (contact_phone.status) {
                        response = {
                            status: 0,
                            message: RESPONSE_MESSAGES.CONTACT_PHONE_NUMBER_IS_ALREADY_Exists,
                            statusCode: RESPONSE_CODES.ALREADY_EXIST,
                            data: {}
                        };
                    } else {
                        response = await addKeyAccountContactservice(body);
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

export const deleteAccountContactController = async (req, res) => {
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
                    let contact_info = await KeyAccountContactDetail({ type: "distributorId_accountId_createdBy", _id: body.contactId, distributorId: body.distributorId, accountId: body.accountId, createdBy: body.createdBy });
                    if (contact_info.status) {
                        response = await deleteKeyAccountContactService(body);
                    } else {
                        response = {
                            status: 0,
                            message: RESPONSE_MESSAGES.CONTACT_NOT_FOUND,
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