import { createUserQuery } from "../../Users/Query/createUserQuery.js";
import { getUserByPhoneQuery } from "../../Users/Query/getUserByPhoneQuery.js";

export const createUserInternal = async ({ fullName, email, phone }) => {

  let user = await getUserByPhoneQuery({ phone });

  if (user) {
    throw new Error("User already exists");
  }

  user = await createUserQuery({
    fullName,
    email,
    phone
  });

  return user;

};