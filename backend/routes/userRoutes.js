import express from 'express';
import { signup, login,logout,reset_password,forget_password } from '../controllers/userController.js';

const router = express.Router();

// Route for user signup
router.post('/signup', signup);

// Route for user login
router.post('/login', login);

// Route for user logout
router.post('/logout',logout);

// Route for password reset
router.post('/reset_password',reset_password);

// Route for password forget
router.post('/forget_password',forget_password);

module.exports = router;