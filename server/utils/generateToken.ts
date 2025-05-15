import jwt from "jsonwebtoken";
import { Payload } from "./interfaces";
import { Response } from "express";

export const generateToken = (payload: Payload, res: Response) => {
  if (!process.env.SECRET_KEY) {
    return;
  }
  const token: string = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
    //secure: process.env.NODE_ENV !== "development",
    secure: false,
  });

  return token;
};
