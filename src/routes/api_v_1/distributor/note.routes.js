import express from "express";
import { addNoteSchema, deleteNoteSchema, noteListingSchema } from "../../../validators/Distributor/Note.js";
import { addNote, deleteNote, noteListing } from "../../../controllers/api_v_1/distributor/note.controller.js";
import { validator } from "../../../helpers/schemaValidator.js";
const router = express.Router();

router.post("/", validator(addNoteSchema), addNote);
router.get("/", validator(noteListingSchema, "query"), noteListing);
router.put("/delete", validator(deleteNoteSchema), deleteNote)

export default router;

