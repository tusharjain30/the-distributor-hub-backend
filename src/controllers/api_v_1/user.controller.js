import { RESPONSE_CODES, RESPONSE_MESSAGES } from "../../../config/constants.js";
import { accessToken, refreshToken } from "../../helpers/jwt.js";
import { registerService, loginService, updateProfileService, userDetail } from "../../services/api_v_1/user.service.js";
import { RESPONSE } from "../../helpers/response.js";

export const registerController = async (req, res) => {
    try {
        let response = RESPONSE;
        const body = req.body;
        const user_email = await userDetail({ email: body.email });
        if (!user_email.status) {
            response = await registerService(body);
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
        let response = RESPONSE;
        const { email, role } = req.body;
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
                const { _id, email, role } = user_info;
                const refresh_token = refreshToken({ _id, email, role, type: "refresh" });
                const access_token = accessToken({ _id, email, role, type: "access" });
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
        let response = RESPONSE;
        const user = req.user;
        const body = req.body;
        body._id = user._id;
        let user_info = await userDetail({ type: "limited_detail", _id: body._id });
        if (user_info.status) {
            let user_email = await userDetail({ type: "email_not_equal", email: body.email, _id: body._id });
            if (user_email.status) {
                response = {
                    status: 0,
                    message: RESPONSE_MESSAGES.EMAIL_ALREADY_REGISTERED,
                    statusCode: RESPONSE_CODES.ALREADY_EXIST,
                    data: {}
                };
                return res.status(response.statusCode).json(response);
            };
            const userInfo = user_info.data;
            if (userInfo.role === "regionalManager") {
                delete body.distributorId;
            } else if (userInfo.role === "distributor") {
                delete body.regions;
            } else {
                delete body.distributorId;
                delete body.regions;
            };
            response = await updateProfileService(body);
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