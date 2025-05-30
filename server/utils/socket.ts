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

// Fix: define onlineUsers as a dictionary with dynamic string keys
const onlineUsers: { [key: string]: string } = {};

io.on("connection", (socket) => {
  console.log(`A user connected ${socket.id}`);

  const userId = socket.handshake.query.userId;

  // Fix: use the actual userId as key, not the string "userId"
  if (userId && typeof userId === "string") {
    onlineUsers[userId] = socket.id;
  }

  // Emit the list of online userIds (the keys of onlineUsers)
  io.emit("getOnlineUsers", Object.keys(onlineUsers));

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
