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

console.log("File exporting...");
io.on("connection", (socket) => {
  console.log("Web socket running");
  console.log(`A user connected ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`A user disconnected ${socket.id}`);
  });
});

export { io, app, server };
