import { loginService } from "../Service/LoginService.js";

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