import redisClient from "../config/redis.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import { sendOTP } from "../utils/twilio.js";

export const signupService = async ({ fullName, email, phone }) => {

  if (!fullName || !email || !phone) {
    throw new Error("fullName, email and phone are required");
  }

  const otp = Math.floor(100000 + Math.random() * 900000);

  await redisClient.set(`otp:${phone}`, otp, { EX: 300 });

  await sendOTP(phone, otp);

  console.log("OTP:", otp);

  return { message: "OTP sent successfully" };
};

export const verifyOTPService = async ({ phone, otp }) => {

  if (!phone || !otp) {
    throw new Error("phone and otp are required");
  }

  const storedOTP = await redisClient.get(`otp:${phone}`);

  if (!storedOTP) {
    throw new Error("OTP expired");
  }

  if (storedOTP !== otp) {
    throw new Error("Invalid OTP");
  }

  await redisClient.del(`otp:${phone}`);

  const user = {
    id: "userId",
    fullName: "Aryesh",
    phone
  };

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  return {
    accessToken,
    refreshToken,
    user
  };
};

export const loginService = async ({ phone }) => {

  if (!phone) {
    throw new Error("phone is required");
  }

  const otp = Math.floor(100000 + Math.random() * 900000);

  await redisClient.set(`otp:${phone}`, otp, { EX: 300 });

  await sendOTP(phone, otp);

  console.log("LOGIN OTP:", otp);

  return { message: "OTP sent successfully" };
};

export const verifyLoginOTPService = async ({ phone, otp }) => {

  if (!phone || !otp) {
    throw new Error("phone and otp are required");
  }

  const storedOTP = await redisClient.get(`otp:${phone}`);

  if (!storedOTP) {
    throw new Error("OTP expired");
  }

  if (storedOTP !== otp) {
    throw new Error("Invalid OTP");
  }

  await redisClient.del(`otp:${phone}`);

  const user = {
    id: "userId",
    fullName: "Aryesh",
    phone
  };

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  return {
    accessToken,
    refreshToken,
    user
  };
};