import { getUserInternal } from "../Internal/getUserInternal.js";

export const checkUserService = async ({ phone }) => {
  try {
    if (!phone) {
      throw new Error("Phone number is required");
    }
    const user = await getUserInternal({ phone });

    if (user) {
      throw {message : "User already registered. Please login.", user : user};
    }

    return user;
  } catch (error) {
    return {message : error.message, user: error.user};
  }
};
