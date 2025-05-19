import { createSlice } from "@reduxjs/toolkit";
//import type { PayloadAction } from "@reduxjs/toolkit";
import {
  SignupThunk,
  SigninThunk,
  CheckAuthThunk,
  LogoutThunk,
} from "../thunks/authThunks";

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
  isChecking: boolean;
  error: string | null;
  message: string | null;
};

const initialState: UserState = {
  user: null,
  isSigningup: false,
  isSigningin: false,
  isChecking: false,
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

    // For Check Authentication
    builder.addCase(CheckAuthThunk.pending, (state) => {
      state.isChecking = true;
      state.user = null;
      state.error = null;
    });
    builder.addCase(CheckAuthThunk.fulfilled, (state, action: any) => {
      state.isChecking = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(CheckAuthThunk.rejected, (state, action: any) => {
      state.isChecking = false;
      state.user = null;
      state.error = action.payload;
    });

    //For Logout
    builder.addCase(LogoutThunk.fulfilled, (state, action: any) => {
      state.user = null;
      state.error = null;
    });
    builder.addCase(LogoutThunk.rejected, (state, action: any) => {
      state.error = action.payload;
    });
  },
});

export default authSlice.reducer;
