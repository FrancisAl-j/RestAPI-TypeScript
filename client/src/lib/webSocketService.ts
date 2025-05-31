import { io, Socket } from "socket.io-client";
import type { UserState } from "./Types";
import type { AppDispatch } from "./store";
import { setOnlineUsers } from "./auth/authSlice";
import type { IMessage } from "./message/Interface";
import { socketNewMessage } from "./message/messageSlice";

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
