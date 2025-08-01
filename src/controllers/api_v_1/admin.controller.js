import { RESPONSE_CODES, RESPONSE_MESSAGES } from "../../../config/constants.js";
import { accessToken, refreshToken } from "../../helpers/jwt.js";
import { adminRegisterService, adminDetail, adminLoginService, updateProfileService } from "../../services/api_v_1/admin.service.js";

// register controller for admin
export const adminRegisterController = async (req, res) => {
    try {
        let response = {
            status: 0,
            message: "",
            statusCode: RESPONSE_CODES.GET,
            data: {}
        };
        const { name, email, role, regions, distributorId } = req.body;
        const admin_email = await adminDetail({ email });
        if (!admin_email.status) {
            response = await adminRegisterService({ name, email, role, regions, distributorId });
        } else {
            response = {
                status: 0,
                message: RESPONSE_MESSAGES.EMAIL_ALREADY_REGISTERED,
                statusCode: RESPONSE_CODES.ALREADY_EXIST,
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

// login controller for admin
export const authLoginController = async (req, res) => {
    try {
        const { email, role } = req.body;
        let response = {
            status: 0,
            message: "",
            statusCode: RESPONSE_CODES.GET,
            data: {}
        };
        let admin_email = await adminDetail({ email });
        if (admin_email.status) {
            const admin_info = admin_email?.data;
            if (admin_info.role !== role) {
                response.message = RESPONSE_MESSAGES.INVALID_ROLE;
                response.statusCode = RESPONSE_CODES.BAD_REQUEST;
            } else {
                const { _id } = admin_info;
                const refresh_token = refreshToken({ adminId: _id, type: "refresh" });
                const access_token = accessToken({ adminId: _id, type: "access" });
                response = await adminLoginService({ _id, refresh_token });
                response.data = {
                    _id,
                    access_token,
                    refresh_token,
                };
            };
        } else {
            response.message = RESPONSE_MESSAGES.INVALID_EMAIL;
            response.statusCode = RESPONSE_CODES.BAD_REQUEST;
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

// update profile controller for admin
export const updateProfileController = async (req, res) => {
    try {
        let response = {
            status: 0,
            message: "",
            statusCode: RESPONSE_CODES.GET,
            data: {}
        };
        const adminId = req.adminId;
        const body = req.body;
        body._id = adminId;
        let admin_info = await adminDetail({ type: "limited_detail", _id: adminId });
        if (admin_info.status) {
            response = await updateProfileService(body);
        } else {
            response.message = RESPONSE_MESSAGES.ADMIN_NOT_FOUND;
            response.statusCode = RESPONSE_CODES.NOT_FOUND;
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