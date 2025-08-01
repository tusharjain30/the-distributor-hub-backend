import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { jwtToken, saltRounds } from "../../config/keys.js";

const extractToken = authToken => {
    if (authToken) {
        const split = authToken.split(' ');
        if (split.length > 1) {
            return split[1];
        } else {
            return authToken;
        };
    } else {
        return authToken;
    };
};

export const verifyAdminToken = (token, adminId = null) => {
    try {
        token = extractToken(token);
        const user = jwt.verify(token, jwtToken);
        if (adminId) {
            if (user.adminId !== adminId) {
                throw new Error('Unauthorized');
            };
        };
        return user;
    } catch (err) {
        throw err;
    };
};

export const verifyToken = (token, userId = null) => {
    try {
        token = extractToken(token);
        const user = jwt.verify(token, jwtToken);
        return user;
    } catch (err) {
        throw err;
    };
};

export const refreshToken = payload => {
    return jwt.sign(payload, jwtToken);
};

export const accessToken = payload => {
    return jwt.sign(payload, jwtToken);
};

export const setResponseToken = (res, token) => {
    return res.set('authorization', token);
};

export const generateHash = async text => {
    const hash = await bcrypt.hash(text, saltRounds);
    return hash;
};

export const compareHash = async (plainTextPassword, hashedPassword) => {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
};