import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../utils/jwt.js";
import { User } from "../../../MongoDB/models.js";

export const createUserService = async ({ fullName, email, phone }) => {
  try {
    let user = await User.findOne({ phone });

    if(user){
        throw new Error("User already exits")
    }

    if (!user) {
      user = await User.create({
        fullName,
        email,
        phone,
      });
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    return {
      userName: user.fullName,
      accessToken,
      refreshToken,
    };
  } catch(error) {
    console.log("Error in creating user");
    throw error;
  }
};
