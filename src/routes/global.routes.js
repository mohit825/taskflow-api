import express from "express";
import { welcomeUser } from "../controllers/global.controller.js";

const router = express.Router();

router.get("/", welcomeUser);

export default router;
