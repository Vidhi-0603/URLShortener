import { createUser, findUserByEmail } from "../dao/findUser.js";
import { ConflictError } from "../utils/errorHandler.js";
import { getJWTToken } from "../utils/token.util.js";
import bcrypt from "bcrypt";

export const registerUser = async (name, email, password) => {
  const user = await findUserByEmail(email);
  if (user) throw new ConflictError("User already exists");

  const saltRounds = 10; // recommended cost factor
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const new_user = await createUser(name, email, hashedPassword);
  const token = getJWTToken({ id: new_user._id });
  console.log(token);

  return {
    token,
    user: {
      id: new_user._id,
      name: new_user.name,
      email: new_user.email,
    },
  };
};

export const loginUuser = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error("Invalid credentials");

  // ✅ Compare input password with hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");
  const token = getJWTToken({ id: user._id });
  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
    },
  };
};
