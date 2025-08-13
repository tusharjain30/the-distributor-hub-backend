import express from "express";
import { validator } from "../../../helpers/schemaValidator.js";
import { addKeyAccount } from "../../../controllers/api_v_1/distributor/keyAccounts.controller.js";
import { addKeyAccountSchema } from "../../../validators/Distributor/KeyAccount.js";
const router = express.Router();

router.post("/", validator(addKeyAccountSchema), addKeyAccount);

export default router;