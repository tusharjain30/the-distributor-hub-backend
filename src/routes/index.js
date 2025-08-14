import express from "express";
import User from "./api_v_1/user.routes.js";
import Distributor from "./api_v_1/distributor/distributor.routes.js";
import Contact from "./api_v_1/distributor/contact.routes.js";
import Note from "./api_v_1/distributor/note.routes.js";
import Account from "./api_v_1/distributor/keyAccount/account.routes.js";
import AccountContact from "./api_v_1/distributor/keyAccount/contact.routes.js";
import AccountNote from "./api_v_1/distributor/keyAccount/note.routes.js";
import { authorizeRoles } from "../helpers/middlewares.js";
const router = express.Router();

router.use("/users", User);
router.use("/distributor", authorizeRoles("manufacturer"), Distributor);
router.use("/distributor/contact", authorizeRoles("manufacturer"), Contact);
router.use("/distributor/note", authorizeRoles("manufacturer"), Note);
router.use("/account", authorizeRoles("manufacturer"), Account);
router.use("/account/contact", authorizeRoles("manufacturer"), AccountContact);
router.use("/account/note", authorizeRoles("manufacturer"), AccountNote);

export default router; 