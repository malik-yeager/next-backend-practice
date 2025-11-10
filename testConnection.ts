// testConnection.ts
import { client } from "./src/config/db";

(async () => {
  try {
    const res = await client.query('SELECT * FROM "User"');
    console.log(res.rows);
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
})();
