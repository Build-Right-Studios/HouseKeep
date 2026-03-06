import { signupService, verifyOTPService, loginService, verifyLoginOTPService } from "../services/auth.service.js";

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

export const login = async (req, res) => {
  try {

    const data = await loginService(req.body);

    res.status(200).json({
      success: true,
      message: data.message
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }
};

export const verifyLoginOTP = async (req, res) => {
  try {

    const data = await verifyLoginOTPService(req.body);

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