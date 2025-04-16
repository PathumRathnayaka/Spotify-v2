import express from "express";
//import { User } from "../models/user.model";
import { authCallBack } from "../controller/auth.controller.js";

const router = express.Router();
router.post("/callback", authCallBack);

export default router;