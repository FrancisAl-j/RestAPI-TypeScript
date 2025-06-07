import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

// Getting the Id of the receiver
export const getReceiverId = (userId: string): string => {
  return onlineUsers[userId];
};

// Getting the recipient id
export const getRecipientId = (userId: string): boolean => {
  const users = Object.keys(activeChatMap);
  const key = users.includes(userId);
  return key;
};

// Fix: define onlineUsers as a dictionary with dynamic string keys
const onlineUsers: { [key: string]: string } = {};

// For Actively Chatting
const activeChatMap: { [userId: string]: string } = {};

io.on("connection", (socket) => {
  console.log(`A user connected ${socket.id}`);

  const userId = socket.handshake.query.userId;

  // Join room / Private Message
  socket.on("join", (userId) => {
    console.log("User Joined.");

    (socket as any).userId = userId;
    socket.join(userId);
  });

  socket.on("setActiveChat", ({ userId, chatWith }) => {
    if (chatWith === null) {
      delete activeChatMap[userId];
      console.log("User in chat map deleted");
    } else {
      activeChatMap[userId] = chatWith;
    }
    console.log(activeChatMap[userId]);
    console.log(activeChatMap);
  });

  // Fix: use the actual userId as key, not the string "userId"
  if (userId && typeof userId === "string") {
    onlineUsers[userId] = socket.id;
  }

  // Emit the list of online userIds (the keys of onlineUsers)
  io.emit("getOnlineUsers", Object.keys(onlineUsers));

  // Logout or closing the window
  socket.on("disconnect", () => {
    console.log(`A user disconnected ${socket.id}`);

    // Remove the disconnected user's entry
    if (userId && typeof userId === "string") {
      delete onlineUsers[userId];
    }

    // Emit updated list of online users
    io.emit("getOnlineUsers", Object.keys(onlineUsers));
  });
});

export { io, app, server };
