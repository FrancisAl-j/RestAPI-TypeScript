import axios from "axios";
import type { AuthTypes, SigninType, SignupType } from "../Types";

const baseURL: string = "http://localhost:3000";

export const auth: AuthTypes = {
  signin: async (formData: SigninType) => {
    try {
      const res = await axios.post(`${baseURL}/api/auth/signin`, formData, {
        withCredentials: true,
      });

      return res.data.message;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else console.log("Unknonw error has occured.");
    }
  },

  signup: async (formData: SignupType) => {
    try {
      console.log(formData);

      const res = await axios.post(`${baseURL}/api/auth/create`, formData);

      return res.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else console.log("Unknonw error has occured.");
    }
  },
};
