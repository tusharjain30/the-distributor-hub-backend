import { RESPONSE_CODES, RESPONSE_MESSAGES } from "../../../../config/constants.js";
import { RESPONSE } from "../../../helpers/response.js";
import { makeContactPrimaryService, getDistributorContactDetails, addDistributorContactService, distributorContactListingService, deleteDistributorContactService } from "../../../services/api_v_1/distributor/contact.service.js";
import { getDistributorDetails } from "../../../services/api_v_1/distributor/distributor.service.js";
import { getUserDetails } from "../../../services/api_v_1/user.service.js";

export const addContactController = async (req, res) => {
    try {
        let response = RESPONSE;
        const user = req.user;
        const body = req.body;
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
                let contact_email = await getDistributorContactDetails({ email: body.email });
                let contact_phone = await getDistributorContactDetails({ queryType: "phone", phone: body.phone });
                if (contact_email.status) {
                    response = {
                        status: 0,
                        message: RESPONSE_MESSAGES.CONTACT_EMAIL_EXISTS,
                        statusCode: RESPONSE_CODES.ALREADY_EXIST,
                        data: {}
                    };
                } else if (contact_phone.status) {
                    response = {
                        status: 0,
                        message: RESPONSE_MESSAGES.CONTACT_PHONE_EXISTS,
                        statusCode: RESPONSE_CODES.ALREADY_EXIST,
                        data: {}
                    };
                } else {
                    response = await addDistributorContactService(body);
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

export const makeContactPrimaryController = async (req, res) => {
    try {
        let response = RESPONSE;
        const user = req.user;
        const body = req.body;
        body.createdBy = user._id;
        let user_info = await getUserDetails({ queryType: "limited_detail", userId: body.createdBy });
        if (user_info.status) {
            let distributor_info = await getDistributorDetails({ queryType: "createdBy", _id: body.distributorId, createdBy: body.createdBy });
            if (distributor_info.status) {
                let contact_info = await getDistributorContactDetails({ queryType: "createdBy", _id: body.contactId, createdBy: body.createdBy, distributorId: body.distributorId });
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

export const contactListingController = async (req, res) => {
    try {
        let response = RESPONSE;
        const user = req.user;
        const body = req.validatedQuery;
        body.createdBy = user._id;
        let user_info = await getUserDetails({ queryType: "limited_detail", userId: body.createdBy });
        if (user_info.status) {
            let distributor_info = await getDistributorDetails({ queryType: "createdBy", _id: body.distributorId, createdBy: body.createdBy });
            if (distributor_info.status) {
                response = await distributorContactListingService(body);
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

export const deleteContactController = async (req, res) => {
    try {
        let response = RESPONSE;
        const user = req.user;
        const body = req.body;
        body.createdBy = user._id;
        let user_info = await getUserDetails({ queryType: "limited_detail", userId: body.createdBy });
        if (user_info.status) {
            let distributor_info = await getDistributorDetails({ queryType: "createdBy", _id: body.distributorId, createdBy: body.createdBy });
            if (distributor_info.status) {
                let contact_info = await getDistributorContactDetails({ queryType: "createdBy", _id: body.contactId, createdBy: body.createdBy, distributorId: body.distributorId });
                if (contact_info.status) {
                    response = await deleteDistributorContactService(body);
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

