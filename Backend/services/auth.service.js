import redisClient from "../config/redis.js";
import { generateToken } from "../utils/jwt.js";
import { sendOTP } from "../utils/twilio.js";

export const signupService = async ({ phone }) => {

  const otp = Math.floor(100000 + Math.random() * 900000);

  await redisClient.set(`otp:${phone}`, otp, { EX: 300 });

  await sendOTP(phone, otp);

  console.log("OTP:", otp);

  return { message: "OTP sent successfully" };
};

export const verifyOTPService = async ({ phone, otp }) => {

  const storedOTP = await redisClient.get(`otp:${phone}`);

  if (!storedOTP) {
    throw new Error("OTP expired");
  }

  if (storedOTP !== otp) {
    throw new Error("Invalid OTP");
  }

  await redisClient.del(`otp:${phone}`);

  const token = generateToken(phone);

  return { token };
};