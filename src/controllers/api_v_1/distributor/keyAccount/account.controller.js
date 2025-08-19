import { RESPONSE_CODES, RESPONSE_MESSAGES } from "../../../../../config/constants.js";
import { RESPONSE } from "../../../../helpers/response.js";
import { getAdoptionLevelById } from "../../../../services/api_v_1/adoptionLevel.service.js";
import { getDistributorDetails } from "../../../../services/api_v_1/distributor/distributor.service.js";
import { getDistributorNameById } from "../../../../services/api_v_1/distributorName.service.js";
import { addDistributorKeyAccountService, deleteDistributorKeyAccountService, distributorKeyAccountListingService, getDistributorkeyAccountDetails, updateDistributorKeyAccountService } from "../../../../services/api_v_1/distributor/keyAccount/account.service.js";
import { getRegionById } from "../../../../services/api_v_1/region.service.js";
import { getStatusById } from "../../../../services/api_v_1/status.service.js";
import { getUserDetails } from "../../../../services/api_v_1/user.service.js";

export const addKeyAccountController = async (req, res) => {
    try {
        let response = RESPONSE;
        const user = req.user;
        const body = req.body;
        body.createdBy = user._id;
        let user_info = await getUserDetails({ queryType: "limited_detail", userId: user._id });
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
                let account_regionId = await getRegionById({ regionId: body?.regionId });
                if (body.regionId && !account_regionId.status) {
                    response = {
                        status: 0,
                        message: RESPONSE_MESSAGES.REGION_INVALID_ID,
                        statusCode: RESPONSE_CODES.BAD_REQUEST,
                        data: {}
                    };
                } else {
                    let account_statusId = await getStatusById({ statusId: body.statusId });
                    if (!account_statusId.status) {
                        response = {
                            status: 0,
                            message: RESPONSE_MESSAGES.INVALID_STATUS_ID,
                            statusCode: RESPONSE_CODES.BAD_REQUEST,
                            data: {}
                        };
                    } else {
                        let account_adoptionLevelId = await getAdoptionLevelById({ levelId: body?.adoptionLevelId });
                        if (body.adoptionLevelId && !account_adoptionLevelId.status) {
                            response = {
                                status: 0,
                                message: RESPONSE_MESSAGES.INVALID_LEVEL_ID,
                                statusCode: RESPONSE_CODES.BAD_REQUEST,
                                data: {}
                            };
                        } else {
                            let account_distributor = await getDistributorNameById({ _id: body?.distributorNameId });
                            if (body.distributorNameId && !account_distributor.status) {
                                response = {
                                    status: 0,
                                    message: RESPONSE_MESSAGES.INVALID_DISTRIBUTOR_NAME_ID,
                                    statusCode: RESPONSE_CODES.BAD_REQUEST,
                                    data: {}
                                };
                            } else {
                                let account_email = await getDistributorkeyAccountDetails({ email: body.email });
                                let account_phone = await getDistributorkeyAccountDetails({ queryType: "phone", phone: body.phone });
                                if (account_email.status) {
                                    response = {
                                        status: 0,
                                        message: RESPONSE_MESSAGES.ACCOUNT_EMAIL_EXISTS,
                                        statusCode: RESPONSE_CODES.ALREADY_EXIST,
                                        data: {}
                                    };
                                } else if (account_phone.status) {
                                    response = {
                                        status: 0,
                                        message: RESPONSE_MESSAGES.ACCOUNT_PHONE_EXISTS,
                                        statusCode: RESPONSE_CODES.ALREADY_EXIST,
                                        data: {}
                                    };
                                } else {
                                    response = await addDistributorKeyAccountService(body);
                                };
                            };
                        };
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

export const keyAccountListingController = async (req, res) => {
    try {
        let response = RESPONSE;
        const user = req.user;
        const body = req.validatedQuery;
        body.createdBy = user._id;
        let user_info = await getUserDetails({ queryType: "limited_detail", userId: body.createdBy });
        if (user_info.status) {
            let distributor_info = await getDistributorDetails({ queryType: "createdBy", _id: body.distributorId, createdBy: body.createdBy });
            if (!distributor_info.status) {
                response = {
                    status: 0,
                    message: RESPONSE_MESSAGES.DISTRIBUTOR_NOT_FOUND,
                    statusCode: RESPONSE_CODES.NOT_FOUND,
                    data: {}
                };
            } else {
                response = await distributorKeyAccountListingService({ ...body, createdBy: body.createdBy });
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
                    response = await deleteDistributorKeyAccountService(body);
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
                let account_regionId = await getRegionById({ regionId: body.regionId });
                if (!account_regionId.status) {
                    response = {
                        status: 0,
                        message: RESPONSE_MESSAGES.REGION_INVALID_ID,
                        statusCode: RESPONSE_CODES.BAD_REQUEST,
                        data: {}
                    };
                } else {
                    let account_adoptionLevelId = await getAdoptionLevelById({ levelId: body.adoptionLevelId });
                    if (!account_adoptionLevelId.status) {
                        response = {
                            status: 0,
                            message: RESPONSE_MESSAGES.INVALID_LEVEL_ID,
                            statusCode: RESPONSE_CODES.BAD_REQUEST,
                            data: {}
                        };
                    } else {
                        let account_distributor = await getDistributorNameById({ _id: body.distributorNameId });
                        if (!account_distributor.status) {
                            response = {
                                status: 0,
                                message: RESPONSE_MESSAGES.INVALID_DISTRIBUTOR_NAME_ID,
                                statusCode: RESPONSE_CODES.BAD_REQUEST,
                                data: {}
                            };
                        } else {
                            let account_statusId = await getStatusById({ statusId: body.statusId });
                            if (!account_statusId.status) {
                                response = {
                                    status: 0,
                                    message: RESPONSE_MESSAGES.INVALID_STATUS_ID,
                                    statusCode: RESPONSE_CODES.BAD_REQUEST,
                                    data: {}
                                };
                            } else {
                                let account_info = await getDistributorkeyAccountDetails({ queryType: "distributorId_createdBy", _id: body.accountId, distributorId: body.distributorId, createdBy: body.createdBy });
                                if (account_info.status) {
                                    let account_email = await getDistributorkeyAccountDetails({ queryType: "emailNotEqual", email: body.email, _id: body.accountId });
                                    let account_phone = await getDistributorkeyAccountDetails({ queryType: "phoneNotEqual", phone: body.phone, _id: body.accountId });
                                    if (account_email.status) {
                                        response = {
                                            status: 0,
                                            message: RESPONSE_MESSAGES.ACCOUNT_EMAIL_EXISTS,
                                            statusCode: RESPONSE_CODES.ALREADY_EXIST,
                                            data: {}
                                        };
                                    } else if (account_phone.status) {
                                        response = {
                                            status: 0,
                                            message: RESPONSE_MESSAGES.ACCOUNT_PHONE_EXISTS,
                                            statusCode: RESPONSE_CODES.ALREADY_EXIST,
                                            data: {}
                                        };
                                    } else {
                                        response = await updateDistributorKeyAccountService({ ...body, updatedBy: user._id });
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
                        };
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
                    response = account_info;
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

