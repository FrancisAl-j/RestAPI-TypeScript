import axios from "axios";
import type { AuthTypes, SigninType, SignupType } from "../Types";
import { io } from "socket.io-client";

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

      return res.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else console.log("Unknonw error has occured.");
    }
  },

  // Connection for WebSocket
  connectSocket: async ({ user, socket }) => {
    try {
      // Checks if the user is falsy or if the socekt is already connected if it is it will just return and not run the function
      if (!user || socket?.connected) return;

      const clientSocket = io(baseURL, {
        query: {
          userId: user?._id,
        },
      });
      clientSocket.connect();

      return clientSocket;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else console.log("Unknonw error has occured.");
    }
  },
};
