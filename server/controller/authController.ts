import { Request, Response } from "express";
import { IUser } from "../utils/interfaces";
import User from "../models/userModel";
import bcrypt from "bcryptjs";

// Sign up
export const authRegister = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, email, password }: IUser = req.body;

  if (password.trim().length < 8) {
    // Don't do this -> return res.status(400).json({ message: "Password should be 8 characters long." }); it will cause an error on typescript since this is a return type
    res.status(400).json({ message: "Password should be 8 characters long." });
    return;
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  try {
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "Create an account." });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
      return;
    } else {
      res.status(500).json({ message: "An unknown error occurred." });
      return;
    }
  }
};

// Signin
export const authSignin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
      return;
    } else {
      res.status(500).json({ message: "An unknown error occurred." });
      return;
    }
  }
};
