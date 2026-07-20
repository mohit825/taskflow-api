import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "TaskFlow API is running",
  });
});

app.listen(5000, () => {
  console.log("server ran on port 5000");
});
