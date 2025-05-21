import mongoose, { Schema } from "mongoose";
import { IUser } from "../utils/interfaces";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default:
        "https://firebasestorage.googleapis.com/v0/b/mern-auth-8d5cf.appspot.com/o/profile.jpg?alt=media&token=4df25a9f-59e0-4e0e-a4f4-d82e4767f694",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("user", userSchema);
export default User;
