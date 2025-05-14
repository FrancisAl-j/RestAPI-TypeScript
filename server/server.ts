import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import cors from "cors";

// utils import
import connectDB from "./utils/config";

// Routes Import
import authRoute from "./routes/authRouter";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  res.send("Hello World. (TypeScript)");
});

// Register an account
app.use("/api/auth", authRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening to port http://localhost:${PORT}`);
  connectDB();
});
