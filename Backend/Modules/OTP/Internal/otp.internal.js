import redisClient from "../../../config/redis.js";

export const saveOTP = async (phone, otp) => {

  await redisClient.set(
    `otp:${phone}`,
    otp,
    {
      EX: 300
    }
  );

};