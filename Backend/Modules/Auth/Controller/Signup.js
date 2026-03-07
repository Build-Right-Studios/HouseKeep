import { signupService } from "../Service/SignUpService.js";

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