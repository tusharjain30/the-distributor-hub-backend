import express from "express";
import { validator } from "../../../../helpers/schemaValidator.js";
import { addKeyAccountContactSchema, deleteKeyAccountContactSchema, keyAccountContactListingSchema } from "../../../../validators/Distributor/KeyAccount/Contact.js";
import { addKeyAccountContactController, deleteAccountContactController, keyAccountContactListingController } from "../../../../controllers/api_v_1/distributor/keyAccount/contact.controller.js";
const router = express.Router();

router.post("/", validator(addKeyAccountContactSchema), addKeyAccountContactController);
router.put("/delete", validator(deleteKeyAccountContactSchema), deleteAccountContactController);
router.get("/", validator(keyAccountContactListingSchema, "query"), keyAccountContactListingController);

export default router;