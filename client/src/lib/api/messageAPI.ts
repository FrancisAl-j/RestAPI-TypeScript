import axios from "axios";
import type { IMessageData, MessageType } from "../Types";

const baseURL: string = "http://localhost:3000";

export const messageAPI: MessageType = {
  sendMessage: async ({ message, receiverId, image }: IMessageData) => {
    try {
      const res = await axios.post(
        `${baseURL}/api/message/create`,
        {
          message,
          receiverId,
          image,
        },
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
