import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// utils import
import connectDB from "./utils/config";

// Routes Import
import authRoute from "./routes/authRouter";
import messageRoute from "./routes/messageRoute";

import { app, io, server } from "./utils/socket";

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", async (req: Request, res: Response) => {
  res.send("Hello World. (TypeScript)");
});

// Register an account
app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Listening to port http://localhost:${PORT}`);
  connectDB();
});
