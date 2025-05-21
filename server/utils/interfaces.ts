import { Document, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId | string;
  name: string;
  email: string;
  password: string;

  // for timestamps: true
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IMessage extends Document {
  _id: Types.ObjectId | string;
  message: string;
  senderId: Types.ObjectId | string;
  receiverId: Types.ObjectId | string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type Payload = {
  _id: Types.ObjectId | string;
  email: string;
  name: string;
};
