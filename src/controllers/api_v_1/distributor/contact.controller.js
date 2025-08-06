import { response } from "express";
import { RESPONSE_CODES, RESPONSE_MESSAGES } from "../../../../config/constants.js";
import { RESPONSE } from "../../../helpers/response.js";
import { addContactService, contactDetail, deleteContactService, contactListingService, makeContactPrimaryService } from "../../../services/api_v_1/distributor/contact.service.js";
import { distributorDetail } from "../../../services/api_v_1/distributor/distributor.service.js";
import { userDetail } from "../../../services/api_v_1/user.service.js";

export const addContact = async (req, res) => {
    try {
        let response = RESPONSE;
        const user = req.user;
        const body = req.body;
        body.manufacturerId = user._id;
        let user_info = await userDetail({ type: "limited_detail", _id: body.manufacturerId });
        if (user_info.status) {
            let distributor_info = await distributorDetail({ type: "limited_detail", _id: body.distributorId });
            if (distributor_info.status) {
                let contact_email = await contactDetail({ email: body.email });
                let contact_phone = await contactDetail({ type: "phone", phone: body.phone });
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
                    response = await addContactService(body);
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
            statusCode: RESPONSE_CODES.ERROR,
            data: {}
        });
    };
};

export const makeContactPrimary = async (req, res) => {
    try {
        let response = RESPONSE;
        const user = req.user;
        const body = req.body;
        body.manufacturerId = user._id;
        let user_info = await userDetail({ type: "limited_detail", _id: body.manufacturerId });
        if (user_info.status) {
            let distributor_info = await distributorDetail({ type: "limited_detail", _id: body.distributorId });
            if (distributor_info.status) {
                let contact_info = await contactDetail({ type: "limited_detail", _id: body.contactId });
                if (contact_info.status) {
                    response = await makeContactPrimaryService(body);
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

export const contactListing = async (req, res) => {
    try {
        let response = RESPONSE;
        const user = req.user;
        const body = req.body;
        body.manufacturerId = user._id;
        let user_info = await userDetail({ type: "limited_detail", _id: body.manufacturerId });
        if (user_info.status) {
            let distributor_info = await distributorDetail({ type: "limited_detail", _id: body.distributorId });
            if (distributor_info.status) {
                response = await contactListingService(body);
            } else {
                response = {
                    status: 0,
                    message: RESPONSE_MESSAGES.DISTRIBUTOR_NOT_FOUND,
                    statusCode: RESPONSE_CODES.NOT_FOUND,
                    data: {}
                };
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
            statusCode: RESPONSE_CODES.ERROR,
            data: {}
        });
    };
};

export const deleteContact = async (req, res) => {
    try {
        let response = RESPONSE;
        const user = req.user;
        const body = req.body;
        body.manufacturerId = user._id;
        let user_info = await userDetail({ type: "limited_detail", _id: body.manufacturerId });
        if (user_info.status) {
            let distributor_info = await distributorDetail({ type: "limited_detail", _id: body.distributorId });
            if (distributor_info.status) {
                let contact_info = await contactDetail({ type: "limited_detail", _id: body.contactId });
                if (contact_info.status) {
                    response = await deleteContactService(body);
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

