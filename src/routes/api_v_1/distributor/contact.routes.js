import express from "express";
import { addContactSchema, deleteContactSchema, contactListingSchema, makeContactPrimarySchema } from "../../../validators/Distributor/Contact.js";
import { addContactController, deleteContactController, contactListingController, makeContactPrimaryController } from "../../../controllers/api_v_1/distributor/contact.controller.js";
import { validator } from "../../../helpers/schemaValidator.js";
const router = express.Router();

router.post("/", validator(addContactSchema), addContactController);
router.put("/", validator(makeContactPrimarySchema), makeContactPrimaryController);
router.get("/", validator(contactListingSchema, "query"), contactListingController);
router.put("/delete", validator(deleteContactSchema), deleteContactController);

export default router;