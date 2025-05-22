import { Router } from "express";
import { getUsers } from "../controller/messageController";
import { verifyUser } from "../utils/verifyUser";

const router = Router();

// Get
router.get("/get-users", verifyUser, getUsers);

export default router;
