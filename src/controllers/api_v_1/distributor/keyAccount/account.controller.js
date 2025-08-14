import { RESPONSE_CODES, RESPONSE_MESSAGES } from "../../../../../config/constants.js";
import { RESPONSE } from "../../../../helpers/response.js";
import { distributorDetail } from "../../../../services/api_v_1/distributor/distributor.service.js";
import { addKeyAccountService, deleteKeyAccountService, keyAccountDetail, keyAccountListingService, updateKeyAccountService } from "../../../../services/api_v_1/distributor/keyAccount/account.service.js";
import { userDetail } from "../../../../services/api_v_1/user.service.js";

export const addKeyAccountController = async (req, res) => {
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

export const keyAccountListingController = async (req, res) => {
    try {
        let response = RESPONSE;
        const user = req.user;
        const body = req.validatedQuery;
        body.createdBy = user._id;
        let user_info = await userDetail({ type: "limited_detail", _id: body.createdBy });
        if (user_info.status) {
            let distributor_info = await distributorDetail({ type: "createdBy", _id: body.distributorId, createdBy: body.createdBy });
            if (!distributor_info.status) {
                response = {
                    status: 0,
                    message: RESPONSE_MESSAGES.DISTRIBUTOR_NOT_FOUND,
                    statusCode: RESPONSE_CODES.NOT_FOUND,
                    data: {}
                };
            } else {
                response = await keyAccountListingService({ ...body, createdBy: body.createdBy });
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

export const deleteKeyAccountController = async (req, res) => {
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
                    response = await deleteKeyAccountService(body);
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

export const updateKeyAccountController = async (req, res) => {
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
                    let account_email = await keyAccountDetail({ type: "email_not_equal", email: body.email, _id: body.accountId });
                    let account_phone = await keyAccountDetail({ type: "phone_not_equal", phone: body.phone, _id: body.accountId });
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
                        response = await updateKeyAccountService({ ...body, updatedBy: user._id });
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

export const getKeyAccountDetailsController = async (req, res) => {
    try {
        let response = RESPONSE;
        const user = req.user;
        const body = req.validatedQuery;
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
                    response = account_info;
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

