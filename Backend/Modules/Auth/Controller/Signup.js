import { signupService } from "../Service/SignUpService.js";

export const signup = async (req, res) => {
  try {
    const { fullName, email, phone } = req.body;

    const data = await signupService({ fullName, email, phone });

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