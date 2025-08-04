import { RESPONSE_CODES, RESPONSE_MESSAGES } from "../../../config/constants.js";
import { accessToken, refreshToken } from "../../helpers/jwt.js";
import { registerService, loginService, updateProfileService, userDetail } from "../../services/api_v_1/user.service.js";

export const registerController = async (req, res) => {
    try {
        let response = {
            status: 0,
            message: "",
            statusCode: RESPONSE_CODES.GET,
            data: {}
        };
        const { name, email, role, regions, distributorId } = req.body;
        const user_email = await userDetail({ email });
        if (!user_email.status) {
            response = await registerService({ name, email, role, regions, distributorId });
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

export const authLoginController = async (req, res) => {
    try {
        const { email, role } = req.body;
        let response = {
            status: 0,
            message: "",
            statusCode: RESPONSE_CODES.GET,
            data: {}
        };
        let user_email = await userDetail({ email });
        if (user_email.status) {
            const user_info = user_email.data;
            if (user_info?.role !== role) {
                response = {
                    status: 0,
                    message: RESPONSE_MESSAGES.INVALID_ROLE,
                    statusCode: RESPONSE_CODES.BAD_REQUEST,
                    data: {}
                };
            } else {
                const { _id } = user_info;
                const refresh_token = refreshToken({ userId: _id, type: "refresh" });
                const access_token = accessToken({ userId: _id, type: "access" });
                response = await loginService({ _id, refresh_token });
                if (response.status) {
                    response.data = {
                        _id,
                        access_token,
                        refresh_token,
                    };
                };
            };
        } else {
            response = {
                status: 0,
                message: RESPONSE_MESSAGES.INVALID_EMAIL,
                statusCode: RESPONSE_CODES.BAD_REQUEST,
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

export const updateProfileController = async (req, res) => {
    try {
        let response = {
            status: 0,
            message: "",
            statusCode: RESPONSE_CODES.GET,
            data: {}
        };
        const userId = req.userId;
        const body = req.body;
        body._id = userId;
        if (body.email) {
            let user_info = await userDetail({ email: body.email });
            if (user_info.status) {
                response = {
                    status: 0,
                    message: RESPONSE_MESSAGES.EMAIL_ALREADY_REGISTERED,
                    statusCode: RESPONSE_CODES.ALREADY_EXIST,
                    data: {}
                };
                return res.status(response.statusCode).json(response);
            };
        };
        response = await updateProfileService(body);
        if (response.status) {
            response = {
                status: 1,
                message: RESPONSE_MESSAGES.PROFILE_UPDATED,
                statusCode: RESPONSE_CODES.GET,
                data: {}
            };
        } else {
            response = {
                status: 0,
                message: RESPONSE_MESSAGES.FAILED_TO_UPDATE_PROFILE,
                statusCode: RESPONSE_CODES.BAD_REQUEST,
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