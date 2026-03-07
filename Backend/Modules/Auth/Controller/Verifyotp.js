import { verifyOTPService } from "../Service/VerifyotpService.js";

export const verifyOTP = async (req, res) => {
  try {

    const data = await verifyOTPService(req.body);

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