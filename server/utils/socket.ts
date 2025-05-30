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

// Storing the online users
const onlineUsers: { userId?: string } = {};

io.on("connection", (socket) => {
  console.log(`A user connected ${socket.id}`);

  const userId = socket.handshake.query.userId;
  if (userId) {
    onlineUsers["userId"] = socket.id;
  }

  // Send events to all connected users
  io.emit("getOnlineUsers", Object.keys(onlineUsers));

  socket.on("disconnect", () => {
    console.log(`A user disconnected ${socket.id}`);
    delete onlineUsers["userId"];
    io.emit("getOnlineUsers", Object.keys(onlineUsers));
  });
});

export { io, app, server };
