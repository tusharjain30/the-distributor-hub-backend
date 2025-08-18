import { RESPONSE_CODES, RESPONSE_MESSAGES } from "../../../../config/constants.js";
import { RESPONSE } from "../../../helpers/response.js";
import { addDistributorService, deleteDistributorService, distributorListingService, getDistributorDetails, updateDistributorService } from "../../../services/api_v_1/distributor/distributor.service.js";
import { getStatusById } from "../../../services/api_v_1/status.service.js";
import { getUserDetails } from "../../../services/api_v_1/user.service.js";

export const addDistributorController = async (req, res) => {
    try {
        let response = RESPONSE;
        const user = req.user;
        const body = req.body;
        body.createdBy = user._id;
        let user_info = await getUserDetails({ queryType: "limited_detail", userId: body.createdBy });
        if (user_info.status) {
            let distributor_statusId = await getStatusById({ statusId: body.statusId });
            let distributor_email = await getDistributorDetails({ email: body.email });
            let distributor_phone = await getDistributorDetails({ queryType: "phone", phone: body.phone });
            if (!distributor_statusId.status) {
                response = {
                    status: 0,
                    message: RESPONSE_MESSAGES.INVALID_STATUS_ID,
                    statusCode: RESPONSE_CODES.BAD_REQUEST,
                    data: {}
                };
            } else if (distributor_email.status) {
                response = {
                    status: 0,
                    message: RESPONSE_MESSAGES.DISTRIBUTOR_EMAIL_EXISTS,
                    statusCode: RESPONSE_CODES.ALREADY_EXIST,
                    data: {}
                };
            } else if (distributor_phone.status) {
                response = {
                    status: 0,
                    message: RESPONSE_MESSAGES.DISTRIBUTOR_PHONE_EXISTS,
                    statusCode: RESPONSE_CODES.ALREADY_EXIST,
                    data: {}
                };
            } else {
                response = await addDistributorService(body);
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

export const updateDistributorController = async (req, res) => {
    try {
        let response = RESPONSE;
        const user = req.user;
        const body = req.body;
        body.updatedBy = user._id;
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
                let distributor_statusId = await getStatusById({ statusId: body.statusId });
                let distributor_email = await getDistributorDetails({ queryType: "emailNotEqual", email: body.email, _id: body.distributorId });
                let distributor_phone = await getDistributorDetails({ queryType: "phoneNotEqual", phone: body.phone, _id: body.distributorId });
                if (!distributor_statusId.status) {
                    response = {
                        status: 0,
                        message: RESPONSE_MESSAGES.INVALID_STATUS_ID,
                        statusCode: RESPONSE_CODES.BAD_REQUEST,
                        data: {}
                    };
                } else if (distributor_email.status) {
                    response = {
                        status: 0,
                        message: RESPONSE_MESSAGES.DISTRIBUTOR_EMAIL_EXISTS,
                        statusCode: RESPONSE_CODES.ALREADY_EXIST,
                        data: {}
                    };
                } else if (distributor_phone.status) {
                    response = {
                        status: 0,
                        message: RESPONSE_MESSAGES.DISTRIBUTOR_PHONE_EXISTS,
                        statusCode: RESPONSE_CODES.ALREADY_EXIST,
                        data: {}
                    };
                } else {
                    response = await updateDistributorService(body);
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

export const deleteDistributorController = async (req, res) => {
    try {
        let response = RESPONSE;
        const user = req.user;
        const body = req.body;
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
                response = await deleteDistributorService({ distributorId: body.distributorId });
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

export const distributorListingController = async (req, res) => {
    try {
        let response = RESPONSE;
        const user = req.user;
        let user_info = await getUserDetails({ queryType: "limited_detail", userId: user._id });
        if (user_info.status) {
            response = await distributorListingService({ ...req.validatedQuery, createdBy: user._id });
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

export const getDistributorDetailsController = async (req, res) => {
    try {
        let response = RESPONSE;
        const user = req.user;
        const body = req.params;
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
                response = distributor_info;
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

