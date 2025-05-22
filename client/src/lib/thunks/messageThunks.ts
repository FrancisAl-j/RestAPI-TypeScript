import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { message } from "../api/messageAPI";

export const GetUsers = createAsyncThunk(
  "message/users",
  async (_, { rejectWithValue }) => {
    try {
      const users = await message.getUsers();

      return users;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Fetching users failed."
        );
      }
      return rejectWithValue("Unknown error occured.");
    }
  }
);
