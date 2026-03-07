import redisClient from "../../../config/redis.js";
import { sendOTP } from "../../../Modules/Messaging/Service/twilio.js";

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