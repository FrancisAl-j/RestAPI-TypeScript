import { createAsyncThunk } from "@reduxjs/toolkit";
import type { SigninType, SignupType } from "../Types";
import axios from "axios";
import { auth } from "../api/authAPI";

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
  async (_, { rejectWithValue }) => {
    try {
      const user = await auth.checkAuth();

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
