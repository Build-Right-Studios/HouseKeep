import mongoose from "mongoose";
import userSchema from "./Schema/user.js";

const User = mongoose.model("User", userSchema);

export { User };