import { createSlice } from "@reduxjs/toolkit";
import type { IMessage } from "./Interface";

const initialState: IMessage = {
  users: [],
  currUser: null,
  messages: [],
  isLoading: false,
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {},
});

export default messageSlice.reducer;
