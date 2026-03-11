import { User } from "../../../MongoDB/models.js";

export const checkUserService = async ({ phone }) => {

  if (!phone) {
    throw new Error("Phone number is required");
  }

  const user = await User.findOne({ phone });

  if (!user) {
    throw new Error("User not registered. Please signup first.");
  }

  return true;
};