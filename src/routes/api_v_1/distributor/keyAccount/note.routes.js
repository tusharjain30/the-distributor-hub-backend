import express from "express";
import { validator } from "../../../../helpers/schemaValidator.js";
import { addAccountNoteSchema } from "../../../../validators/Distributor/KeyAccount/Note.js";
import { addAccountNote } from "../../../../controllers/api_v_1/distributor/keyAccount/note.controller.js";
const router = express.Router();

router.post("/", validator(addAccountNoteSchema), addAccountNote);

export default router;