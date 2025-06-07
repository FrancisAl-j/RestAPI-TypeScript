import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { messageAPI } from "../api/messageAPI";
import type { IMessageData, UserState } from "../Types";
import {
  removeActiveChat,
  setActiveChat,
  unreadMessage,
  webSocketMessage,
} from "../webSocketService";
import type { AppDispatch } from "../store";

// Sending or Creating Messages
export const SendMessage = createAsyncThunk(
  "message/create",
  async (
    { message, receiverId, image }: IMessageData,
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const userState = getState() as { user: UserState };
      const currState = getState() as { message: IMessage };
      const { user } = userState.user;
      const { currUser } = currState.message;
      const newMessage = await messageAPI.sendMessage({
        message,
        receiverId,
        image,
      });

      // Receive message from the websocket
      await unreadMessage(dispatch as AppDispatch);

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

// Get unread messages
export const UnreadMessages = createAsyncThunk(
  "message/unread",
  async (_, { rejectWithValue }) => {
    try {
      const unreadMessages = await messageAPI.getUnreadMessages();

      return unreadMessages;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message ||
            "There was a problem fetching a messages."
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

// For live messaging
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

// Real-time Indication Messages (unread)
export const LiveUnreadMessages = createAsyncThunk(
  "message/unread-live",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await unreadMessage(dispatch as AppDispatch);
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

// Real-time picking a user and closing it
export const SetActiveUser = createAsyncThunk(
  "socket/set-user",
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      const state = getState() as { message: IMessage };
      const userState = getState() as { user: UserState };
      const { currUser } = state.message;
      const { user } = userState.user;
      await setActiveChat(currUser, user, dispatch as AppDispatch);
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Unknown error occured.");
    }
  }
);

// Closing chat real-time
export const RemoveActiveUser = createAsyncThunk(
  "socket/remove-user",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { user: UserState };
      const { user } = state.user;
      await removeActiveChat(user);
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Unknown error occured.");
    }
  }
);
