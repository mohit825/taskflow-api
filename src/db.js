import { Pool } from "pg";

export const dbPool = new Pool({
  user: process.env.DATABASE_USER, // Your pgAdmin username
  host: process.env.DATABASE_HOST, // Your server host
  database: process.env.DATABASE, // Your specific database name
  password: process.env.DATABASE_KEY, // Your actual database password
  port: process.env.DATABASE_PORT, // Your database port
});

dbPool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  console.log("Successfully connected to the PostgreSQL server!");
  release(); // Always release the client back to the pool
});
