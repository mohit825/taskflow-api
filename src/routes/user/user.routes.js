import express from "express";
import { UserController } from "../../controllers/user/user.controller.js";
import { registerUserValidation } from "../../validators/user.validation.js";

const router = express.Router();

router.post("/register", registerUserValidation, UserController.registerUser);

export default router;
