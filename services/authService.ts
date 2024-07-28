import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { supabase } from "../config/supabase";
import { sendMail } from "../services/sendMail";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel";
import logger from "../logger/logger";

dotenv.config();

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  role: string
) => {
  // const { data, error } = await supabase.auth.signUp({ email, password });

  // if (error) throw error;
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    logger.info(`User registration failed : User already exist - ${email}`);
    return email;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new UserModel({ name, email, password: hashedPassword, role });
  await user.save();
  sendMail([email]);
  return;
};

export const loginUser = async (email: string, password: string) => {
  // const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  // if (error) throw error;

  const user = await UserModel.findOne({ email });
  if (!user) {
    logger.info(`User Login Failed: Invalid Credentials - ${email}`);
    return { message: "Invalid credentials" };
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    logger.info(`User Login Failed: Invalid Credentials - ${email}`);
    return { message: "Invalid credentials" };
  }

  const token = jwt.sign({ userId: user._id, role: user.role }, "your_jwt_secret", {
    expiresIn: "1h",
  });

  logger.info(`User logged in successfully - ${email}`);
  return {
    token,
    user: { id: user._id, email: user.email }
  };
};
