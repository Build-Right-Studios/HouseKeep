import { signupService, verifyOTPService } from "../services/auth.service.js";

export const signup = async (req, res) => {
  try {

    const data = await signupService(req.body);

    res.status(200).json({
      success: true,
      message: data.message
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


export const verifyOTP = async (req, res) => {
  try {

    console.log("REQ BODY:", req.body);

    const data = await verifyOTPService(req.body);

    res.status(200).json({
      success: true,
      token: data.token
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }
};