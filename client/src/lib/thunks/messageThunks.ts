import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { messageAPI } from "../api/messageAPI";
import type { IMessageData } from "../Types";

// Sending or Creating Messages
export const SendMessage = createAsyncThunk(
  "message/create",
  async ({ message, receiverId, image }: IMessageData, { rejectWithValue }) => {
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
