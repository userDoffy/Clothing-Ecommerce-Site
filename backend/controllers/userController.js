import User from "../models/userModel.js";
import { sendEmail } from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

// Generate OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Generate JWT Token
const generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TIMEOUT });
};

// Signup - Send OTP for Verification
export const signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ status: "fail", message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = generateOTP();

        const user = new User({ email, password: hashedPassword, otp, isVerified: false });
        await user.save();

        await sendEmail(email, "Verify Your Account", `Your OTP is: ${otp}`);

        res.status(201).json({
            status: "success",
            message: "OTP sent to email for verification",
        });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};

// Verify OTP (Account Activation)
export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });

        if (!user || user.otp !== otp) {
            return res.status(400).json({ status: "fail", message: "Invalid OTP" });
        }

        user.isVerified = true;
        user.otp = null;
        await user.save();

        res.status(200).json({ status: "success", message: "Account verified successfully" });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};

// Login with 2FA OTP
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ status: "fail", message: "Invalid credentials" });
        }

        if (!user.isVerified) {
            return res.status(400).json({ status: "fail", message: "Account not verified" });
        }

        const otp = generateOTP();
        user.otp = otp;
        await user.save();

        await sendEmail(email, "Login OTP", `Your OTP is: ${otp}`);

        res.status(200).json({
            status: "success",
            message: "OTP sent to email for login verification",
        });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};

// Verify Login OTP
export const verifyLoginOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });

        if (!user || user.otp !== otp) {
            return res.status(400).json({ status: "fail", message: "Invalid OTP" });
        }

        const token = generateToken(user);
        user.otp = null;
        await user.save();

        res.status(200).json({ status: "success", token });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};

// Forgot Password - Send OTP
export const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ status: "fail", message: "User not found" });
        }

        const otp = generateOTP();
        user.otp = otp;
        await user.save();

        await sendEmail(email, "Reset Password OTP", `Your OTP is: ${otp}`);

        res.status(200).json({ status: "success", message: "OTP sent to email" });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};

// Reset Password
export const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        const user = await User.findOne({ email });

        if (!user || user.otp !== otp) {
            return res.status(400).json({ status: "fail", message: "Invalid OTP" });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.otp = null;
        await user.save();

        res.status(200).json({ status: "success", message: "Password reset successful" });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};

// Logout
export const logout = (req, res) => {
    res.status(200).json({ status: "success", message: "Logged out successfully" });
};
