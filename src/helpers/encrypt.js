import crypto from "crypto";

export const SHA256 = async text => {
    const encrypted = crypto.createHash('sha256').update(text).digest('hex');
    return encrypted;
};

export const SHA512 = async text => {
    const encrypted = crypto.createHash('sha512').update(text).digest('hex');
    return encrypted;
};