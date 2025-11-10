import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect()
  .then(() => console.log("Connected to Postgres via Client"))
  .catch((err) => console.error("DB connection error:", err));
