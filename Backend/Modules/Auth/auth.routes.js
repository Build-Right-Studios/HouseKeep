import express from "express";
import { signup } from "./Controller/Signup.js";
import { verifyOTP } from "./Controller/Verifyotp.js"
import { login } from "./Controller/Login.js";
import { verifyLoginOTP } from "./Controller/VerifyLoginotp.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/verify-otp", verifyOTP);
router.post("/login", login);
router.post("/login/verify", verifyLoginOTP);

export default router;