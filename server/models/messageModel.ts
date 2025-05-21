import mongoose, { model, Schema } from "mongoose";
import { IMessage } from "../utils/interfaces";

const messageSchema = new Schema<IMessage>(
  {
    message: {
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
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model<IMessage>("message", messageSchema);

export default Message;
