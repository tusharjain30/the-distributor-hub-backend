import express from "express";
import { validator } from "../../../../helpers/schemaValidator.js";
import { addKeyAccountSchema, deleteAccountSchema, getKeyAccountDetailsSchema, keyAccountListingQuerySchema, updateKeyAccountSchema } from "../../../../validators/Distributor/keyAccount/Account.js";
import { addKeyAccountController, deleteKeyAccountController, getKeyAccountDetailsController, keyAccountListingController, updateKeyAccountController } from "../../../../controllers/api_v_1/distributor/keyAccount/account.controller.js";
const router = express.Router();

router.post("/", validator(addKeyAccountSchema), addKeyAccountController);
router.get("/", validator(keyAccountListingQuerySchema, "query"), keyAccountListingController);
router.put("/", validator(updateKeyAccountSchema), updateKeyAccountController);
router.put("/delete", validator(deleteAccountSchema), deleteKeyAccountController);
router.get("/details", validator(getKeyAccountDetailsSchema, "query"), getKeyAccountDetailsController);

export default router;