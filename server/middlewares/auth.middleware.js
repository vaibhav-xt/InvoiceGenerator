import responseCreator, { generateAccessToken, verifyToken } from "../config/helpers.config.js";

const isUserAuthorized = async (req, res, next) => {
    const accessToken = req.headers['x-access-token'];

    // checking token header 
    if (!accessToken) {
        return responseCreator(res, 404, "AuthFailed", "Response header is missing.");
    }

    try {
        // verify token and get user data
        const isUser = verifyToken(accessToken);
        req.user = isUser._doc;
        next();
    } catch (error) {
        return responseCreator(res, 400, "AuthFailed", error.message);
    }

}

export default isUserAuthorized;