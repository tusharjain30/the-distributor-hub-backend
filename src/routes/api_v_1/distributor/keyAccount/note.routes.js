import express from "express";
import { validator } from "../../../../helpers/schemaValidator.js";
import { addAccountNoteSchema, deleteAccountNoteSchema } from "../../../../validators/Distributor/KeyAccount/Note.js";
import { addKeyAccountNoteController, deleteKeyAccountNoteController } from "../../../../controllers/api_v_1/distributor/keyAccount/note.controller.js";
const router = express.Router();

router.post("/", validator(addAccountNoteSchema), addKeyAccountNoteController);
router.put("/delete", validator(deleteAccountNoteSchema), deleteKeyAccountNoteController);

export default router;