import express from "express";
import { addDistributorSchema, deleteDistributorSchema, distributorListingQuerySchema, getDistributorDetailsSchema, updateDistributorSchema } from "../../../validators/Distributor/Distributor.js";
import { addDistributorController, deleteDistributorController, distributorListingController, getDistributorDetailsController, updateDistributorController } from "../../../controllers/api_v_1/distributor/distributor.controller.js";
import { validator } from "../../../helpers/schemaValidator.js";
const router = express.Router();

router.post("/", validator(addDistributorSchema), addDistributorController);
router.put("/", validator(updateDistributorSchema), updateDistributorController);
router.put("/delete", validator(deleteDistributorSchema), deleteDistributorController);
router.get("/", validator(distributorListingQuerySchema, "query"), distributorListingController);
router.get("/:distributorId", validator(getDistributorDetailsSchema, "params"), getDistributorDetailsController);

export default router;

