import redisClient from "../../../config/redis.js";
import { sendOTP } from "../../../Modules/Messaging/Service/twilio.js";
import { generateOTP } from "../../../utils/generateOTP.js";
import { checkUserService } from "../../Users/Service/checkUserService.js";

export const signupService = async ({ phone }) => {
  try {
    const data = await checkUserService({ phone });
    if(data.length !== 0) {
      throw {data};
    }
    const otp = generateOTP()

    await redisClient.set(`otp:${phone}`, otp, { EX: 300 });
    console.log("OTP Generated")

    await sendOTP(phone, otp);

    console.log("OTP:", otp);

    return { message: "OTP sent successfully" };
  } catch(error) {
    // console.log("Error from signupService", error)
    return error;
  }
};