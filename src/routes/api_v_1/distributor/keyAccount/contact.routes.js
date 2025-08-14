import express from "express";
import { validator } from "../../../../helpers/schemaValidator.js";
import { addKeyAccountContactSchema, deleteKeyAccountContactSchema } from "../../../../validators/Distributor/KeyAccount/Contact.js";
import { addKeyAccountContactController, deleteAccountContactController } from "../../../../controllers/api_v_1/distributor/keyAccount/contact.controller.js";
const router = express.Router();

router.post("/addContact", validator(addKeyAccountContactSchema), addKeyAccountContactController)
router.put("/deleteContact", validator(deleteKeyAccountContactSchema), deleteAccountContactController)

export default router;