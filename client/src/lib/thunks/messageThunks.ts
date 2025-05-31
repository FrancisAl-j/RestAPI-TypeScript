import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { messageAPI } from "../api/messageAPI";
import type { IMessageData } from "../Types";
import { webSocketMessage } from "../webSocketService";
import type { AppDispatch } from "../store";

// Sending or Creating Messages
export const SendMessage = createAsyncThunk(
  "message/create",
  async (
    { message, receiverId, image }: IMessageData,
    { rejectWithValue, dispatch }
  ) => {
    try {
      const newMessage = await messageAPI.sendMessage({
        message,
        receiverId,
        image,
      });

      return newMessage;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message ||
            "There was a problem sending a message."
        );
      }
      return rejectWithValue("Unknown error occured.");
    }
  }
);

export const GetMessages = createAsyncThunk(
  "message/get-messages",
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const messages = await messageAPI.getMessages({ id });

      return messages;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message ||
            "There was a problem fetching a message."
        );
      }
      return rejectWithValue("Unknown error occured.");
    }
  }
);

export const GetUsers = createAsyncThunk(
  "message/users",
  async (_, { rejectWithValue }) => {
    try {
      const users = await messageAPI.getUsers();

      return users;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Fetching users failed."
        );
      }
      return rejectWithValue("Unknown error occured.");
    }
  }
);

// Message Live
type User = {
  _id: string;
  name: string;
  email: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
};

type IMessage = {
  users: User[];
  currUser: User | null;
  messages: {
    message: string;
    receiverId: string;
    senderId: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  isMessagesLoaidng: boolean;
  isLoading: boolean;
  error: string | null;
};

export const LiveMessage = createAsyncThunk(
  "message/live",
  async (_, { rejectWithValue, dispatch, getState }) => {
    try {
      const state = getState() as { message: IMessage };
      const { currUser } = state.message;
      await webSocketMessage(currUser, dispatch as AppDispatch);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Live messaging failed."
        );
      }
      return rejectWithValue("Unknown error occured.");
    }
  }
);
