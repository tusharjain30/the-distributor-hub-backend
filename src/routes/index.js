import express from "express";
import User from "./api_v_1/user.routes.js";
import Distributor from "./api_v_1/distributor/distributor.routes.js";
import Contact from "./api_v_1/distributor/contact.routes.js";
import { authorizeRoles } from "../helpers/middlewares.js";
const router = express.Router();

router.use("/users", User);
router.use("/distributor", authorizeRoles("manufacturer"), Distributor);
router.use("/contact", authorizeRoles("manufacturer"), Contact);

export default router; 