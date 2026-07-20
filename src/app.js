import express from "express";
import "dotenv/config";

export const app = express();

import { dbPool } from "./db.js";

app.get("/", (req, res) => {
  res.json({
    message: "TaskFlow API is running",
  });
});
