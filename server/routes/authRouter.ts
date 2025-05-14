import { Router } from "express";
import { authRegister } from "../controller/authController";

const router = Router();

router.post("/create", authRegister);

export default router;
