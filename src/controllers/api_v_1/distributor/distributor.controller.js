import { ObjectId } from "mongodb";
import { RESPONSE_CODES, RESPONSE_MESSAGES } from "../../../../config/constants.js";
import { RESPONSE } from "../../../helpers/response.js";
import { addDistributorService, deleteDistributorService, distributorDetail, distributorListingService, updateDistributorService } from "../../../services/api_v_1/distributor/distributor.service.js";
import { userDetail } from "../../../services/api_v_1/user.service.js";

export const addDistributor = async (req, res) => {
    try {
        let response = RESPONSE;
        const user = req.user;
        const body = req.body;
        body.createdBy = user._id;
        let user_info = await userDetail({ type: "limited_detail", _id: body.createdBy });
        if (user_info.status) {
            let distributor_email = await distributorDetail({ email: body.email });
            let distributor_phone = await distributorDetail({ type: "phone", phone: body.phone });
            if (distributor_email.status) {
                response = {
                    status: 0,
                    message: RESPONSE_MESSAGES.DISTRIBUTOR_EMAIL_IS_ALREADY_Exists,
                    statusCode: RESPONSE_CODES.ALREADY_EXIST,
                    data: {}
                };
            } else if (distributor_phone.status) {
                response = {
                    status: 0,
                    message: RESPONSE_MESSAGES.DISTRIBUTOR_PHONE_NUMBER_IS_ALREADY_Exists,
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

export const updateDistributor = async (req, res) => {
    try {
        let response = RESPONSE;
        const user = req.user;
        const body = req.body;
        let user_info = await userDetail({ type: "limited_detail", _id: user._id });
        if (user_info.status) {
            let distributor_info = await distributorDetail({ type: "id", _id: body.distributorId });
            if (!distributor_info.status) {
                response = {
                    status: 0,
                    message: RESPONSE_MESSAGES.DISTRIBUTOR_NOT_FOUND,
                    statusCode: RESPONSE_CODES.NOT_FOUND,
                    data: {}
                };
            } else if (distributor_info.data && (!distributor_info.data.createdBy.equals(new ObjectId(user._id)))) {
                response = {
                    status: 0,
                    message: RESPONSE_MESSAGES.DISTRIBUTOR_NOT_FOUND,
                    statusCode: RESPONSE_CODES.NOT_FOUND,
                    data: {}
                };
            } else {
                let distributor_email = await distributorDetail({ type: "email_not_equal", email: body.email, _id: body.distributorId });
                let distributor_phone = await distributorDetail({ type: "phone_not_equal", phone: body.phone, _id: body.distributorId });
                if (distributor_email.status) {
                    response = {
                        status: 0,
                        message: RESPONSE_MESSAGES.DISTRIBUTOR_EMAIL_IS_ALREADY_Exists,
                        statusCode: RESPONSE_CODES.ALREADY_EXIST,
                        data: {}
                    };
                } else if (distributor_phone.status) {
                    response = {
                        status: 0,
                        message: RESPONSE_MESSAGES.DISTRIBUTOR_PHONE_NUMBER_IS_ALREADY_Exists,
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

export const deleteDistributor = async (req, res) => {
    try {
        let response = RESPONSE;
        const user = req.user;
        const body = req.body;
        let user_info = await userDetail({ type: "limited_detail", _id: user._id });
        if (user_info.status) {
            let distributor_info = await distributorDetail({ type: "id", _id: body.distributorId });
            if (!distributor_info.status) {
                response = {
                    status: 0,
                    message: RESPONSE_MESSAGES.DISTRIBUTOR_NOT_FOUND,
                    statusCode: RESPONSE_CODES.NOT_FOUND,
                    data: {}
                };
            } else if (distributor_info.data && (!distributor_info.data.createdBy.equals(new ObjectId(user._id)))) {
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

export const distributorListing = async (req, res) => {
    try {
        let response = RESPONSE;
        const user = req.user;
        let user_info = await userDetail({ type: "limited_detail", _id: user._id });
        if (user_info.status) {
            response = await distributorListingService({ ...req.query, userId: user._id });
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

