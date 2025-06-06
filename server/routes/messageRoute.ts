import { Router } from "express";
import {
  createMessage,
  getMessages,
  getUnreadMessages,
  getUsers,
} from "../controller/messageController";
import { verifyUser } from "../utils/verifyUser";

const router = Router();

// Post
router.post("/create", verifyUser, createMessage);

// Get
router.get("/get-users", verifyUser, getUsers);
router.get("/unread", verifyUser, getUnreadMessages);
router.get("/get-messages/:id", verifyUser, getMessages);

export default router;
