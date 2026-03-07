import { verifyOTPService } from "../Service/VerifyotpService.js";

export const verifyOTP = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    const data = await verifyOTPService({ phone, otp });

    res.status(200).json({
      success: true,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      user: data.user
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }
};