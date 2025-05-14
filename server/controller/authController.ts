import express, { Request, Response } from "express";
import { IUser } from "../utils/interfaces";
import User from "../models/userModel";
import bcrypt from "bcryptjs";

// Sign up
export const authRegister = async (req: Request, res: Response) => {
  const { name, email, password }: IUser = req.body;

  if (password.trim().length < 8) {
    return res
      .status(400)
      .json({ message: "Password should be 8 characters long." });
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
    }
  }
};
