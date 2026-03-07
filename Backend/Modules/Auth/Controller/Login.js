import { loginService } from "../Service/LoginService.js";

export const login = async (req, res) => {
  try {
    const { phone, otp } = req.body; 

    const data = await loginService({ phone, otp });

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