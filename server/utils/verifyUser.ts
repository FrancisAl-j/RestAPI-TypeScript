import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// Without this the Request won't recognize the "user" in req.user = user
interface CustomRequest extends Request {
  user?: any;
}

export const verifyUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  // Getting the token on cookies
  const token = req.cookies.token;

  // Checks if there is a token
  if (!token) {
    res.status(401).json({ message: "User not authenticated." });
    return;
  }

  try {
    if (!process.env.SECRET_KEY) {
      return;
    }

    const token_decode = jwt.verify(token, process.env.SECRET_KEY);
    req.user = token_decode;
    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ message: "Token is not valid." });
      return;
    } else {
      res.status(500).json({ message: "An unknown error occurred." });
      return;
    }
  }
};
