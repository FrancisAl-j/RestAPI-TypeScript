import { createSlice } from "@reduxjs/toolkit";

type UserState = {
  user: {
    _id: string;
    name: string;
    email: string;
    createdAt?: Date;
    updatedAt?: Date;
  } | null;
  isSigningup: boolean;
  isSigniningin: boolean;
  error: string | null;
  message: string | null;
};

const initialState: UserState = {
  user: null,
  isSigningup: false,
  isSigniningin: false,
  error: null,
  message: null,
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default authSlice.reducer;
