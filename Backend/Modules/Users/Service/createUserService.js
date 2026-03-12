import { generateAccessToken, generateRefreshToken } from "../../../utils/jwt.js";
import { createUserInternal } from "../Internal/createUserInternal.js";

export const createUserService = async ({ fullName, email, phone }) => {

  const user = await createUserInternal({
    fullName,
    email,
    phone
  });

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  return {
    userName: user.fullName,
    accessToken,
    refreshToken
  };

};