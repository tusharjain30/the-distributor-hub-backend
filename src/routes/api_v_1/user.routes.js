import express from "express";
import { authLoginController, registerController, updateProfileController } from "../../controllers/api_v_1/user.controller.js";
import { validator } from "../../helpers/schemaValidator.js";
import { loginSchema, registerSchema, updateProfileSchema } from "../../validators/User.js";

const router = express.Router();

router.post("/register", validator(registerSchema), registerController);
router.post("/login", validator(loginSchema), authLoginController);
router.patch("/", validator(updateProfileSchema), updateProfileController);

export default router;