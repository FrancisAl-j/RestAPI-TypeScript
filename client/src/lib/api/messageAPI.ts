import axios from "axios";
import type { GetMessageResponse, IMessageData, MessageType } from "../Types";

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

  getMessages: async ({
    id,
    page,
    limit,
  }: {
    id: string;
    page: number;
    limit: number;
  }): Promise<GetMessageResponse> => {
    try {
      const res = await axios.get(`${baseURL}/api/message/get-messages/${id}`, {
        params: { page, limit },
        withCredentials: true,
      });

      return res;
    } catch (error) {
      if (error instanceof Error) {
        throw error.message;
      } else {
        console.log("Unknonw error has occured.");
        throw new Error("asdasd");
      }
    }
  },

  getUsers: async (query: string) => {
    try {
      const res = await axios.get(`${baseURL}/api/message/get-users`, {
        params: { query },
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else console.log("Unknonw error has occured.");
    }
  },

  getUnreadMessages: async () => {
    try {
      const res = await axios.get(`${baseURL}/api/message/unread`, {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      throw error;
    }
  },
};
