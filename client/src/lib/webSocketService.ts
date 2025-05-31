import { io, Socket } from "socket.io-client";
import type { UserState } from "./Types";
import type { AppDispatch } from "./store";
import { setOnlineUsers } from "./auth/authSlice";

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
