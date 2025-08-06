import express from "express";
import { addContactSchema, deleteContactSchema, contactListingSchema, makeContactPrimarySchema } from "../../../validators/Distributor/Contact.js";
import { addContact, deleteContact, contactListing, makeContactPrimary } from "../../../controllers/api_v_1/distributor/contact.controller.js";
import { validator } from "../../../helpers/schemaValidator.js";
const router = express.Router();

router.post("/", validator(addContactSchema), addContact);
router.put("/", validator(makeContactPrimarySchema), makeContactPrimary);
router.get("/", validator(contactListingSchema), contactListing);
router.put("/delete", validator(deleteContactSchema), deleteContact);

export default router;