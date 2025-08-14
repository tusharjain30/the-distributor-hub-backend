import express from "express";
import { addNoteSchema, deleteNoteSchema, noteListingSchema } from "../../../validators/Distributor/Note.js";
import { addNoteController, deleteNoteController, noteListingController } from "../../../controllers/api_v_1/distributor/note.controller.js";
import { validator } from "../../../helpers/schemaValidator.js";
const router = express.Router();

router.post("/", validator(addNoteSchema), addNoteController);
router.get("/", validator(noteListingSchema, "query"), noteListingController);
router.put("/delete", validator(deleteNoteSchema), deleteNoteController)

export default router;

