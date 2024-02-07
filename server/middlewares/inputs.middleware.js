import { body } from "express-validator";

export default {
    // Parameter for signup form validation
    registration: [
        body('username', 'Name must have at least 3 characters.').isLength({ min: 3 }),
        body('email', 'Email is not valid.').isEmail(),
        body('password', 'Password must have at least 7 characters.').isLength({ min: 7 }),
        body('confirm_password', 'Confirm Password must have at least 7 characters.').isLength({ min: 7 })
    ],

    // Parameters for login form validation
    login: [
        body('email', 'Email is not valid.').isEmail(),
    ],
};
