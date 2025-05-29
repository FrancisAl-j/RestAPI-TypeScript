import { createAsyncThunk } from "@reduxjs/toolkit";
import type { SigninType, SignupType, User } from "../Types";
import axios from "axios";
import { auth } from "../api/authAPI";
import type { Socket } from "socket.io-client";

// Signup Thunk
export const SignupThunk = createAsyncThunk(
  "user/signup",
  async (formData: SignupType, { rejectWithValue }) => {
    try {
      const success = await auth.signup(formData);

      return success;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Sign-up failed"
        );
      }
      return rejectWithValue("Sign-up failed");
    }
  }
);

// Signin Thunk
export const SigninThunk = createAsyncThunk(
  "user/signin",
  async (formData: SigninType, { rejectWithValue }) => {
    try {
      const user = await auth.signin(formData);

      localStorage.setItem("visited", "1");
      return user;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Sign-up failed"
        );
      }
      return rejectWithValue("Sign-up failed");
    }
  }
);

// Check Authentication Thunk
export const CheckAuthThunk = createAsyncThunk(
  "user/check",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const user = await auth.checkAuth();
      setTimeout(() => {
        dispatch(ConnectSocketThunk());
      }, 0);
      return user;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Authentication failed."
        );
      }
      return rejectWithValue("Authentication failed.");
    }
  }
);

// For Logout Thunks
export const LogoutThunk = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const message = await auth.logout();

      return message;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Log out failed."
        );
      }
      return rejectWithValue("Log out failed.");
    }
  }
);

// Connection for WebSocket
type UserState = {
  user: {
    _id: string;
    name: string;
    email: string;
    image: string;
    createdAt?: Date;
    updatedAt?: Date;
  } | null;
  isSigningup: boolean;
  isSigningin: boolean;
  isChecking: boolean;
  error: string | null;
  message: string | null;
  onlineUsers: [];
  socket: Socket | null;
};

export const ConnectSocketThunk = createAsyncThunk(
  "user/socket",
  async (_, { rejectWithValue, getState }) => {
    try {
      console.log("Thunk Sockett running");

      const state = getState() as { user: UserState };
      const { user, socket } = state.user;
      const result = await auth.connectSocket({ user, socket });
      console.log(result);

      return result;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Connection failed."
        );
      }
      return rejectWithValue("Connection failed.");
    }
  }
);
