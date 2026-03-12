import { getUserByPhoneQuery } from "../Query/getUserByPhoneQuery.js";

export const getUserInternal = async ({ phone }) => {

  const user = await getUserByPhoneQuery({ phone });

  return user;
};