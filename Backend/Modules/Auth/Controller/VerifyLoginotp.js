import { verifyLoginOTPService } from "../Service/VerifyLoginotpService.js";

export const verifyLoginOTP = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    const data = await verifyLoginOTPService({ phone, otp });

    res.status(200).json({
      success: true,
      userName: data.userName,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }
};