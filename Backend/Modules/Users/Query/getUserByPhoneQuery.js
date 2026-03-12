import { User } from "../../../MongoDB/models.js";

export const getUserByPhoneQuery = async ({ phone }) => {

  const user = await User.findOne({ phone }).lean();

  return user;
};