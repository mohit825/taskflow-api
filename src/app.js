import { app } from "./server.js";
import { pool } from "../src/db.js";

app.get("/", (req, res) => {
  res.json({
    message: "TaskFlow API is running",
  });
});
