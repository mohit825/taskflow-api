import { app } from "./app.js";

app.listen(process.env.PORT, () => {
  console.log(`Environment loaded on ${process.env.PORT}`);
});
