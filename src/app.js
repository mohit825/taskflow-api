import express from "express";
import "dotenv/config";
import globalRoutes from "./routes/globalRoutes.js";
import userRoutes from "./routes/userRoutes.js";

export const app = express();

import { dbPool } from "./db.js";

app.use("/", globalRoutes);
app.use("/user", userRoutes);
