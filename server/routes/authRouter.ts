import { Router } from "express";
import {
  authRegister,
  authSignin,
  checkAuth,
  signout,
  updateUser,
} from "../controller/authController";
import { verifyUser } from "../utils/verifyUser";

const router = Router();

//POST
router.post("/create", authRegister);
router.post("/signin", authSignin);
router.post("/logout", signout);

// PUT
router.put("/update", verifyUser, updateUser);

// GET
router.get("/get", verifyUser, checkAuth);

export default router;
