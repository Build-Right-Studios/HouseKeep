import { User } from "../../../MongoDB/models.js";

export const createUserQuery = async ({ fullName, email, phone }) => {

  const user = await User.create({
    fullName,
    email,
    phone
  });

  return user;

};