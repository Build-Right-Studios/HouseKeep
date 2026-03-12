import { getUserInternal } from "../Internal/getUserInternal.js";

export const getUserService = async ({ phone }) => {

  if (!phone) {
    throw new Error("Phone is required");
  }

  const user = await getUserInternal({ phone });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};