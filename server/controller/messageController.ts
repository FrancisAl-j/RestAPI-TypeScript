import { Request, Response } from "express";
import Message from "../models/messageModel";
import User from "../models/userModel";
import { CustomRequest } from "../utils/interfaces";

export const createMessage = async (req: CustomRequest, res: Response) => {
  const { message, receiverId } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(401).json({ message: "User not authenticated." });
      return;
    }

    const newMessage = new Message({
      message,
      receiverId,
      senderId: user._id,
    });

    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
      return;
    }
  }
};
