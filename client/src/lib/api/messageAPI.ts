import axios from "axios";

const baseURL: string = "http://localhost:3000";

export const message = {
  getUsers: async () => {
    try {
      const res = await axios.get(`${baseURL}/api/message/get-users`, {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else console.log("Unknonw error has occured.");
    }
  },
};
