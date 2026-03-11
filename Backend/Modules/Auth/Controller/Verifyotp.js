import { verifyOTPService } from "../Service/VerifyotpService.js";
import { createUserService } from "../../Users/Service/createUserService.js";

export const verifyOTP = async (req, res) => {
  try {
    const { fullName, email, phone, otp } = req.body;

    const verifiedOTP = await verifyOTPService({ phone, otp });
    
    if(!verifiedOTP){
      throw new Error("OTP Verification Failed")
    }

    const userData = await createUserService({ fullName, email, phone });

    res.status(200).json({
      success: true,
      userName: userData.userName,
      accessToken: userData.accessToken,
      refreshToken: userData.refreshToken,
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }
};