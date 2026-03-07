import redisClient from "../../../config/redis.js";
import { sendOTP } from "../../../Modules/Messaging/Service/twilio.js";
import { User } from "../../../MongoDB/models.js"

export const loginService = async ({ phone }) => {

  if (!phone) {
    throw new Error("phone is required");
  }

  //add a check 
  const user = await User.findOne({ phone })

  if(!user){
    throw new Error("User not registered. Please signup first.")
  }

  const otp = Math.floor(100000 + Math.random() * 900000);

  await redisClient.set(`otp:${phone}`, otp, { EX: 300 });

  await sendOTP(phone, otp);

  console.log("LOGIN OTP:", otp);

  return { message: "OTP sent successfully" };
};