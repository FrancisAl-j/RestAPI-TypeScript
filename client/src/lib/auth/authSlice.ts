import { createSlice } from "@reduxjs/toolkit";
//import type { PayloadAction } from "@reduxjs/toolkit";
import { SignupThunk, SigninThunk } from "../thunks/authThunks";

type UserState = {
  user: {
    _id: string;
    name: string;
    email: string;
    createdAt?: Date;
    updatedAt?: Date;
  } | null;
  isSigningup: boolean;
  isSigningin: boolean;
  error: string | null;
  message: string | null;
};

const initialState: UserState = {
  user: null,
  isSigningup: false,
  isSigningin: false,
  error: null,
  message: null,
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // For Signup
    builder.addCase(SignupThunk.pending, (state) => {
      state.isSigningup = true;
      state.error = null;
    });
    builder.addCase(SignupThunk.fulfilled, (state) => {
      state.isSigningup = false;
      state.error = null;
    });
    builder.addCase(SignupThunk.rejected, (state, action: any) => {
      state.isSigningup = false;
      state.error = action.payload;
    });

    // For Signin
    builder.addCase(SigninThunk.pending, (state) => {
      state.isSigningin = true;
      state.error = null;
    });
    builder.addCase(SigninThunk.fulfilled, (state, action: any) => {
      state.isSigningin = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(SigninThunk.rejected, (state, action: any) => {
      state.isSigningin = false;
      state.user = null;
      state.error = action.payload;
    });
  },
});

export default authSlice.reducer;
