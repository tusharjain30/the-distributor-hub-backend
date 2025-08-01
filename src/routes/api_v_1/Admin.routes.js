import express from "express";
import { authLoginController, adminRegisterController, updateProfileController } from "../../controllers/api_v_1/admin.controller.js";
import { validator } from "../../helpers/schemaValidator.js";
import { loginSchema, registerSchema, updateProfileSchema } from "../../validators/Admin.js";

const router = express.Router();

router.post("/register", validator(registerSchema), adminRegisterController);
router.post("/login", validator(loginSchema), authLoginController);
router.patch("/", validator(updateProfileSchema), updateProfileController);

export default router;