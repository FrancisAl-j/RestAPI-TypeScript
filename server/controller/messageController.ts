import { Request, Response } from "express";
import Message from "../models/messageModel";

export const createMessage = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
      return;
    }
  }
};
