import { RESPONSE_CODES, RESPONSE_MESSAGES } from "../../../../config/constants.js";
import { RESPONSE } from "../../../helpers/response.js";
import { distributorDetail } from "../../../services/api_v_1/distributor/distributor.service.js";
import { addKeyAccountService, keyAccountDetail } from "../../../services/api_v_1/distributor/keyAccount.service.js";
import { userDetail } from "../../../services/api_v_1/user.service.js";

export const addKeyAccount = async (req, res) => {
    try {
        let response = RESPONSE;
        const user = req.user;
        const body = req.body;
        body.createdBy = user._id;
        let user_info = await userDetail({ type: "limited_detail", _id: user._id });
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
                let account_email = await keyAccountDetail({ email: body.email });
                let account_phone = await keyAccountDetail({ type: "phone", phone: body.phone });
                if (account_email.status) {
                    response = {
                        status: 0,
                        message: RESPONSE_MESSAGES.ACCOUNT_EMAIL_IS_ALREADY_EXISTS,
                        statusCode: RESPONSE_CODES.ALREADY_EXIST,
                        data: {}
                    };
                } else if (account_phone.status) {
                    response = {
                        status: 0,
                        message: RESPONSE_MESSAGES.ACCOUNT_PHONE_IS_ALREADY_EXISTS,
                        statusCode: RESPONSE_CODES.ALREADY_EXIST,
                        data: {}
                    };
                } else {
                    response = await addKeyAccountService(body);
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
        res.status(RESPONSE_CODES.ERROR).json(response);
    } catch (error) {
        res.status(RESPONSE_CODES.ERROR).json({
            status: 0,
            message: error.message,
            status: RESPONSE_CODES.ERROR,
            data: {}
        });
    };
};

// In progress
export const deleteKeyAccount = async (req, res) => {
    try {
        let response = RESPONSE;
        const user = req.user;
        const body = req.body;
        body.createdBy = user._id;
        let user_info = await userDetail({ type: "limited_detail", _id: user._id });
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
                let account_info = await keyAccountDetail({ type: "limited_detail", _id: body.accountId });
                if (account_info.status) {
                    //...
                } else {
                    response = {
                        status: 0,
                        message: RESPONSE_MESSAGES.ACCOUNT_NOT_FOUND,
                        statusCode: RESPONSE_CODES.NOT_FOUND,
                        data: {}
                    };
                }
            }
        } else {
            response = {
                status: 0,
                message: RESPONSE_MESSAGES.USER_NOT_FOUND,
                statusCode: RESPONSE_CODES.NOT_FOUND,
                data: {}
            };
        };
        res.status(RESPONSE_CODES.ERROR).json(response);
    } catch (error) {
        res.status(RESPONSE_CODES.ERROR).json({
            status: 0,
            message: error.message,
            status: RESPONSE_CODES.ERROR,
            data: {}
        });
    };
};