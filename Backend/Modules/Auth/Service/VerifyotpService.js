import redisClient from "../../../config/redis.js";

export const verifyOTPService = async ({ phone, otp }) => {

  if (!phone || !otp) {
    throw new Error("phone and otp are required");
  }

  const storedOTP = await redisClient.get(`otp:${phone}`);
  console.log(storedOTP);

  if (!storedOTP) {
    throw new Error("Incorrect Details");
  }

  if (storedOTP !== otp) {
    throw new Error("Invalid OTP");
  }

  if(storedOTP === otp){
    await redisClient.del(`otp:${phone}`);
    return true;
  }
};