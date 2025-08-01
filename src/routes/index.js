import express from "express";
import Admin from "./api_v_1/Admin.routes.js";
const router = express.Router();

router.use("/admins", Admin);

export default router;