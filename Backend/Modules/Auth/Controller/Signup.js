import { signupService } from "../Service/SignUpService.js";

export const signup = async (req, res) => {
  try {
    const { fullName, email, phone } = req.body;

    if (!fullName || fullName == " ") {
      throw {
        status: 400,
        success: false,
        message: "fullName is required"
      };
    }

    if (!email) {
      throw {
        status: 400,
        success: false,
        message: "email is required"
      };
    }

    if (!phone) {
      throw {
        status: 400,
        success: false,
        message: "phone is required"
      };
    }

    const data = await signupService({ fullName, email, phone });
    if(data.data.user) {
      throw {status: 400, success: false, data: data};
    }

    res.status(200).json({
      success: true,
      message: data.message
    });

  } catch (error) {
    res.status(error.status).json({
      success: error.success,
      message: data.data.message
    });
  }
};