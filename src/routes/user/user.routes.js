import express from "express";
import { UserController } from "../../controllers/user/user.controller.js";
import {
  loginUserValidation,
  registerUserValidation,
} from "../../validators/user.validation.js";

const router = express.Router();

router.post("/register", registerUserValidation, UserController.registerUser);
router.post("/login", loginUserValidation, UserController.loginUser);

export default router;
