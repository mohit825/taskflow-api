import express from "express";
import "dotenv/config";

export const app = express();

app.listen(process.env.PORT, () => {
  console.log(`Environment loaded on ${process.env.PORT}`);
});
