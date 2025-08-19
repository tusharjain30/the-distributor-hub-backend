import express from "express";
import { validator } from "../../../../helpers/schemaValidator.js";
import { addAccountNoteSchema, deleteAccountNoteSchema, keyAccountNoteListingSchema } from "../../../../validators/Distributor/KeyAccount/Note.js";
import { addKeyAccountNoteController, deleteKeyAccountNoteController, keyAccountNoteListingController } from "../../../../controllers/api_v_1/distributor/keyAccount/note.controller.js";
const router = express.Router();

router.post("/", validator(addAccountNoteSchema), addKeyAccountNoteController);
router.put("/delete", validator(deleteAccountNoteSchema), deleteKeyAccountNoteController);
router.get("/", validator(keyAccountNoteListingSchema, "query"), keyAccountNoteListingController);


export default router;