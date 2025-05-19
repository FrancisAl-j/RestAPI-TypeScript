import axios from "axios";
import type { AuthTypes, SigninType, SignupType } from "../Types";

const baseURL: string = "http://localhost:3000";

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
      console.log("Running");

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

      return res.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else console.log("Unknonw error has occured.");
    }
  },
};
