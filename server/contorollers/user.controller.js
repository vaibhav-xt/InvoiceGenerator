import { validationResult } from "express-validator";
import UserModel from "../models/user.models.js";
import bcrypt, { compare } from 'bcrypt';
import responseCreator, { generateAccessToken } from "../config/helpers.config.js";

export default {
    registration: async (req, res) => {
        try {
            // Validating form 
            const validationErrors = validationResult(req);
            if (!validationErrors.isEmpty()) {
                return responseCreator(res, 400, 'Failed', validationErrors.array().map((err) => err.msg));
            }

            const { username, email, password, confirm_password } = req.body;

            // comparing password and confirm_password
            if (password !== confirm_password) {
                throw new Error("Password and Confirm Password do not match");
            }

            // checking if user already exists
            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                throw new Error("Email address is already in use.");
            }

            // hashing password
            const salt = await bcrypt.genSalt(12);
            const hashPassword = await bcrypt.hash(password, salt);

            // creating user model 
            const newUser = new UserModel({
                username,
                email,
                password: hashPassword
            });

            // saving data to mongodb
            await newUser.save();

            return responseCreator(res, 201, "Success", "Registration done successfully.");
        } catch (error) {
            return responseCreator(res, 400, "Failed", error.message);
        }
    },

    //Login
    login: async (req, res) => {
        // Validating form 
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            return responseCreator(res, 400, 'Failed', validationErrors.array().map((err) => err.msg));
        }

        try {
            const { email, password } = req.body;

            // Is user exist with this email
            const user = await UserModel.findOne({ email });
            if (!user) {
                throw new Error("User is not registered with this email.");
            }

            // compare password
            const isPasswordMatch = await bcrypt.compare(password, user.password);

            if (!isPasswordMatch) {
                throw new Error("Incorrect password.");
            }

            // sending access token
            const access_token = generateAccessToken(user);

            return responseCreator(res, 200, "LogedInSuccess", "Login successful.", { user, access_token });
        } catch (error) {
            return responseCreator(res, 400, "Failed", error.message);
        }
    }

};
