import express from 'express';
import { signup, login,logout,resetPassword,forgetPassword,verifyOTP,verifyLoginOTP } from '../controllers/userController.js';

const router = express.Router();

// Route for user signup
router.post('/signup', signup);

router.post('/verifyotp',verifyOTP)

// Route for user login
router.post('/login', login);

// Route for user logout
router.post('/logout',logout);

// Route for password reset
router.post('/reset_password',resetPassword);

// Route for password forget
router.post('/forget_password',forgetPassword);

export default router