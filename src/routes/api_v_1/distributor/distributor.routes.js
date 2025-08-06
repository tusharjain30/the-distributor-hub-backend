import express from "express";
import { addDistributorSchema, deleteDistributorSchema, updateDistributorSchema } from "../../../validators/Distributor/Distributor.js";
import { addDistributor, deleteDistributor, distributorListing, updateDistributor } from "../../../controllers/api_v_1/distributor/distributor.controller.js";
import { validator } from "../../../helpers/schemaValidator.js";
const router = express.Router();

router.post("/", validator(addDistributorSchema), addDistributor);
router.put("/", validator(updateDistributorSchema), updateDistributor);
router.put("/delete", validator(deleteDistributorSchema), deleteDistributor);
router.get("/", distributorListing);

export default router;

