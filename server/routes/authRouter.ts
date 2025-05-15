import { Router } from "express";
import { authRegister, authSignin } from "../controller/authController";

const router = Router();

router.post("/create", authRegister);
router.post("/signin", authSignin);

export default router;
