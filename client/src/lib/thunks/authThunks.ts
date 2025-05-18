import { createAsyncThunk } from "@reduxjs/toolkit";
import type { SigninType, SignupType } from "../Types";
import axios from "axios";
import { auth } from "../api/authAPI";

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

export const SigninThunk = createAsyncThunk(
  "user/signin",
  async (formData: SigninType, { rejectWithValue }) => {
    try {
      console.log("Running");

      const user = await auth.signin(formData);

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
