import jwt from "jsonwebtoken";
import { SECRET_ACCESS_TOKEN } from "./variables.config.js";

// Response Creator function
const responseCreator = (res, statusCode, status, message, other) => {
    const statusObject = {
        status: status,
        message: Array.isArray(message) ? [...message] : [message],
    };

    // if other 
    if (other) {
        statusObject.data = other;
    }

    return res.status(statusCode).send(statusObject);
};

export const generateAccessToken = (user) => {
    try {
        // token generate
        return jwt.sign({ ...user }, SECRET_ACCESS_TOKEN, { expiresIn: '10m' });
    } catch (error) {
        throw new Error('Unable to generate user token.');
    }
}

export const verifyToken = (token) => {
    try {
        // verify token 
        return jwt.verify(token, SECRET_ACCESS_TOKEN);
    } catch (error) {
        throw new Error("User is not authorized.");
    }
}

export default responseCreator;

