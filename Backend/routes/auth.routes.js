import express from "express";
import { signup, verifyOTP, login, verifyLoginOTP } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/verify-otp", verifyOTP);
router.post("/login", login);
router.post("/login/verify", verifyLoginOTP);

export default router;