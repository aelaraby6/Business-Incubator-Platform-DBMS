/**
 * @file server.js
 * @description Entry point for bootstrapping the Express web server.
 * Loads environment configurations, verifies PostgreSQL connectivity, and starts listening on the designated port.
 */

import { config } from "dotenv";
import app from "./app.js";
import pool from "./config/db.js";

// Load configuration variables from the .env file
config({ debug: false });

const port = process.env.PORT || 3000;

/**
 * Validates connectivity to the PostgreSQL database by running a test query.
 * @async
 * @function testConnection
 * @returns {Promise<void>} Resolves when connection succeeds, otherwise throws an error.
 * @throws {Error} If database connection fails.
 */
async function testConnection() {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("PostgreSQL connected successfully at:", res.rows[0].now);
  } catch (err) {
    console.error("DB connection error:", err.message);
    throw err;
  }
}

// Start database connection test followed by server listener initialization
testConnection()
  .then(() => {
    app.listen(port, () => {
      console.log(`[Server Ready] Access the Web Platform at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Critical Failure: Failed to connect to database or boot express server:", err.message);
    process.exit(1);
  });
