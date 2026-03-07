import redisClient from "../../../config/redis.js";
import { generateAccessToken, generateRefreshToken } from "../../../utils/jwt.js";

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