import redisClient from "../../../config/redis.js";
import { sendOTP } from "../../../Modules/Messaging/Service/twilio.js";

export const signupService = async ({ fullName, email, phone }) => {

  if (!fullName || !email || !phone) {
    throw new Error("fullName, email and phone are required");
  }

  const otp = Math.floor(100000 + Math.random() * 900000);

  await redisClient.set(`otp:${phone}`, otp, { EX: 300 });
  console.log("OTP Generated")

  await sendOTP(phone, otp);

  console.log("OTP:", otp);

  return { message: "OTP sent successfully" };
};