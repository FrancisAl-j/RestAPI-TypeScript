import mongoose, { model, Schema } from "mongoose";
import { IMessage } from "../utils/interfaces";

const messageSchema = new Schema<IMessage>(
  {
    message: {
      type: String,
    },
    image: {
      type: String,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    isRead: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model<IMessage>("message", messageSchema);

export default Message;
