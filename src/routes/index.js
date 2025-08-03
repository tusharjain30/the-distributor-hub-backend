import express from "express";
import User from "./api_v_1/user.routes.js";
const router = express.Router();

router.use("/users", User);

export default router; 