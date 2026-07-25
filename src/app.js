import express from "express";
import "dotenv/config";
import globalRoutes from "./routes/globalRoutes.js";

export const app = express();

import { dbPool } from "./db.js";

app.use("/", globalRoutes);
