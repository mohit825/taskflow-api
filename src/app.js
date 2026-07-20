import express from "express";
import "dotenv/config";
import { pool } from "../src/db.js";

const app = express();

app.get("/", (req, res) => {
  res.send({
    message: "TaskFlow API is running",
  });
});

console.log("server");
app.listen(process.env.PORT, () => {
  console.log(`server ran on port ${process.env.PORT}`);
});
