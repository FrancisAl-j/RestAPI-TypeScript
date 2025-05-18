import { Router } from "express";
import {
  authRegister,
  authSignin,
  checkAuth,
} from "../controller/authController";
import { verifyUser } from "../utils/verifyUser";

const router = Router();

//POST
router.post("/create", authRegister);
router.post("/signin", authSignin);

// GET
router.get("/get", verifyUser, checkAuth);

export default router;
