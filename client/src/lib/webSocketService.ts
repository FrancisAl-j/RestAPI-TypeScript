import { io, Socket } from "socket.io-client";
import type { UserState } from "./Types";
import type { AppDispatch } from "./store";
import { setOnlineUsers } from "./auth/authSlice";
import type { IMessage } from "./message/Interface";
import { getActiveChat, socketNewMessage } from "./message/messageSlice";

let socket: Socket | null = null;

export const connectWebSocket = (
  url: string,
  user: UserState["user"],
  dispatch: AppDispatch
) => {
  socket = io(url, {
    query: {
      userId: user?._id,
    },
  });

  socket.connect();

  // Storing userId on websocket
  socket.on("getOnlineUsers", (userId) => {
    dispatch(setOnlineUsers(userId));
  });
};

// Logout and disconnect on WebSocket
export const disconnectWebSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};

// Connecting to live message
export const webSocketMessage = (
  user: IMessage["currUser"],
  dispatch: AppDispatch
) => {
  if (!user) return;

  if (socket) {
    socket.on("newMessage", (newMessage) => {
      dispatch(socketNewMessage(newMessage));
    });
  }
};

// For Receiving a message with indication /  Clicking and adding a user to a chat
type CurrUserType = IMessage["currUser"];
type UserType = UserState["user"];

// Checks if the user you click is actively chatting you
export const setActiveChat = (
  currUser: CurrUserType,
  user: UserType,
  dispatch: AppDispatch
) => {
  if (socket && currUser) {
    socket.emit("join", currUser?._id);
    socket.emit("setActiveChat", {
      userId: user?._id,
      chatWith: currUser?._id,
    });

    dispatch(getActiveChat(currUser?._id));
  }
};

// Remove user to chat or close the chat
export const removeActiveChat = (user: UserType) => {
  if (socket) {
    socket.emit("setActiveChat", { userId: user?._id, chatWith: null });
  }
};

// Receiving message based on activeness of user in tha chat
type MessageType = {
  message: string;
  image: string;
  receiverId: string;
  senderId: string;
  createdAt?: Date;
  updatedAt?: Date;
};
export const receiveMessage = (
  user: UserType,
  currUser: CurrUserType,
  message: MessageType | void
) => {
  if (socket) {
    socket.emit("sendNewMessage", {
      from: user?._id,
      to: currUser?._id,
      message,
    });
  }
};
