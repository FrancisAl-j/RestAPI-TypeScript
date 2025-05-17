import { createAsyncThunk } from "@reduxjs/toolkit";
import type { SignupType } from "../Types";
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
          error.response?.data?.message || "Sign-in failed"
        );
      }
      return rejectWithValue("Sign-up failed");
    }
  }
);
