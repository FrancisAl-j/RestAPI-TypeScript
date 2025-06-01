import axios from "axios";
import type {
  AuthTypes,
  SigninType,
  SignupType,
  UpdateUserType,
} from "../Types";
import { disconnectWebSocket } from "../webSocketService";

const baseURL: string = "http://localhost:3000"; // Base URL of the server

export const auth: AuthTypes = {
  // Sign in or Logging in
  signin: async (formData: SigninType) => {
    try {
      const res = await axios.post(`${baseURL}/api/auth/signin`, formData, {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else console.log("Unknonw error has occured.");
    }
  },

  // Sign up or Creating an account
  signup: async (formData: SignupType) => {
    try {
      const res = await axios.post(`${baseURL}/api/auth/create`, formData);

      return res.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else console.log("Unknonw error has occured.");
    }
  },

  // Checking the token to let the user logged in
  checkAuth: async () => {
    try {
      const res = await axios.get(`${baseURL}/api/auth/get`, {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else console.log("Unknonw error has occured.");
    }
  },

  logout: async () => {
    try {
      const res = await axios.post(
        `${baseURL}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      disconnectWebSocket();
      return res.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else console.log("Unknonw error has occured.");
    }
  },

  update: async (formData: UpdateUserType) => {
    try {
      const res = await axios.put(`${baseURL}/api/auth/update`, formData, {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      throw error;
    }
  },
};
