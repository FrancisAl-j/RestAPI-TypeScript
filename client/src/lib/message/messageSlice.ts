import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IMessage } from "./Interface";
import {
  GetMessages,
  GetUsers,
  SendMessage,
  SetActiveUser,
  UnreadMessages,
} from "../thunks/messageThunks";
import type { User } from "./Interface";

const initialState: IMessage = {
  users: [],
  currUser: null,
  messages: [],
  isMessagesLoaidng: false,
  isLoading: false,
  insUnreadLoading: false,
  error: null,
  unreadMessages: [],
  activeUserChat: null,
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
      state.activeUserChat = null;
    },

    socketNewMessage: (state, action: any) => {
      state.messages.push(action.payload);
    },

    getActiveChat: (state, action: PayloadAction<string>) => {
      state.activeUserChat = action.payload;
    },
    receiveUnreadMessages: (state, action: any) => {
      state.unreadMessages.push(action.payload);
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

    // Fetch Unread Messages
    builder.addCase(UnreadMessages.pending, (state) => {
      state.insUnreadLoading = true;
    });
    builder.addCase(UnreadMessages.fulfilled, (state, action: any) => {
      state.insUnreadLoading = false;
      state.unreadMessages = action.payload;
    });
    builder.addCase(UnreadMessages.rejected, (state) => {
      state.insUnreadLoading = false;
    });
  },
});

export default messageSlice.reducer;

export const {
  chooseUser,
  removeUser,
  socketNewMessage,
  getActiveChat,
  receiveUnreadMessages,
} = messageSlice.actions;
