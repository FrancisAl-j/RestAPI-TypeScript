import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IMessage } from "./Interface";
import { GetUsers } from "../thunks/messageThunks";
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
  },
});

export default messageSlice.reducer;

export const { chooseUser, removeUser } = messageSlice.actions;
