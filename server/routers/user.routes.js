import express from 'express';
import inputMidelleware from '../middlewares/inputs.middleware.js'
import userControllers from '../contorollers/user.controller.js';

// router 
const router = express.Router();

// user registration 
router.post('/register', inputMidelleware.registration, userControllers.registration);
router.post('/login', inputMidelleware.login, userControllers.login);

export default router;