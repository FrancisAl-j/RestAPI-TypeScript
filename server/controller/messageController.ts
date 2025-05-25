import { Request, Response } from "express";
import Message from "../models/messageModel";
import User from "../models/userModel";
import { CustomRequest } from "../utils/interfaces";

// Sending or creating new messages
export const createMessage = async (req: CustomRequest, res: Response) => {
  const { message, receiverId, image } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(401).json({ message: "User not authenticated." });
      return;
    }

    const newMessage = new Message({
      message,
      receiverId,
      image,
      senderId: user._id,
    });

    await newMessage.save();

    res.status(201).json(newMessage);
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

// Displaying all users
export const getUsers = async (req: CustomRequest, res: Response) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(401).json({ message: "User not authenticated." });
      return;
    }

    const users = await User.find({ _id: { $ne: user._id } }).select(
      "-password"
    ); //  $ne => Not equal (meaning getting all users except the current user)

    res.status(200).json(users);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred." });
      return;
    }
  }
};

// Fetch message
export const getMessages = async (req: CustomRequest, res: Response) => {
  const { receiverId } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(401).json({ message: "User not authenticated." });
      return;
    }

    const messages = await Message.find({
      receiverId,
      senderId: user._id,
    });

    res.status(200).json(messages);
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
