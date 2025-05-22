import { createSlice } from "@reduxjs/toolkit";
import type { IMessage } from "./Interface";
import { GetUsers } from "../thunks/messageThunks";

const initialState: IMessage = {
  users: [],
  currUser: null,
  messages: [],
  isLoading: false,
  error: null,
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {},
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
