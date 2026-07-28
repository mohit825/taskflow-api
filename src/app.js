import express from "express";
import "dotenv/config";
import globalRoutes from "./routes/global/global.routes.js";
import userRoutes from "./routes/user/user.routes.js";

export const app = express();
app.use(express.json());
app.use("/", globalRoutes);
app.use("/user", userRoutes);
