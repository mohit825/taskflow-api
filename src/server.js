import { app } from "./app.js";
import { dbPool } from "./db.js";

app.listen(process.env.PORT, () => {
  console.log(`Environment loaded on ${process.env.PORT}`);
});
