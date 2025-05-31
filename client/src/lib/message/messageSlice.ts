import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IMessage } from "./Interface";
import { GetMessages, GetUsers, SendMessage } from "../thunks/messageThunks";
import type { User } from "./Interface";

const initialState: IMessage = {
  users: [],
  currUser: null,
  messages: [],
  isMessagesLoaidng: false,
  isLoading: false,
  error: null,
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    chooseUser: (state, action: PayloadAction<User>) => {
      state.currUser = action.payload;
    },
    removeUser: (state) => {
      state.currUser = null;
    },

    socketNewMessage: (state, action: any) => {
      state.messages.push(action.payload);
    },
  },

  // extraReducers for thunks
  extraReducers: (builder) => {
    builder.addCase(GetUsers.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(GetUsers.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.users = action.payload;
      state.error = null;
    });
    builder.addCase(GetUsers.rejected, (state, action: any) => {
      state.isLoading = false;
      state.users = [];
      state.error = action.payload;
    });

    // Sending message
    builder.addCase(SendMessage.pending, (state) => {
      state.isMessagesLoaidng = true;
      state.error = null;
    });
    builder.addCase(SendMessage.fulfilled, (state, action: any) => {
      state.isMessagesLoaidng = true;
      state.messages.push(action.payload);
      state.error = null;
    });
    builder.addCase(SendMessage.rejected, (state, action: any) => {
      state.isMessagesLoaidng = true;
      state.messages = [];
      state.error = action.payload;
    });

    // Fetching messages
    builder.addCase(GetMessages.pending, (state) => {
      state.isLoading = true;
      state.messages = [];
      state.error = null;
    });
    builder.addCase(GetMessages.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.messages = action.payload;
      state.error = null;
    });
    builder.addCase(GetMessages.rejected, (state, action: any) => {
      state.isLoading = false;
      state.messages = [];
      state.error = action.payload;
    });
  },
});

export default messageSlice.reducer;

export const { chooseUser, removeUser, socketNewMessage } =
  messageSlice.actions;
