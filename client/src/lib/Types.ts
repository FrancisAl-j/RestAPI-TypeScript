import type { Socket } from "socket.io-client";

export type User = {
  _id: string;
  name: string;
  email: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type SigninType = {
  email: string;
  password: string;
};

export type SignupType = {
  name: string;
  email: string;
  password: string;
};

export type UpdateUserType = {
  name: string;
  email?: string;
  password: string;
};

export type MessageType = {
  sendMessage: ({ message, receiverId, image }: IMessageData) => void;
  getUsers: () => void;
  getMessages: ({ id }: { id: string }) => void;
};

export type UserState = {
  user: {
    _id: string;
    name: string;
    email: string;
    image: string;
    createdAt?: Date;
    updatedAt?: Date;
  } | null;
  isSigningup: boolean;
  isSigningin: boolean;
  isChecking: boolean;
  error: string | null;
  message: string | null;
  onlineUsers: [];
};

export type AuthTypes = {
  signin: (formData: SigninType) => void;
  signup: (formData: SignupType) => void;
  update: (formData: UpdateUserType) => void;
  checkAuth: () => void;
  logout: () => void;
};

export interface IMessageData {
  message: string;
  receiverId: string;
  image: string;
}
