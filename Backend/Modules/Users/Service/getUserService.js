import { User } from "../../../MongoDB/models.js";

export const getUserService = async ({ phone }) => {

  const user = await User.findOne({ phone });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};