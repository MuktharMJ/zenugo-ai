/**
 * ==============================================================
 * PostgreSQL Client — Zenugo AI Concept Module
 * ==============================================================
 * This module provides a PostgreSQL connection pool for the
 * relational schema concept demonstration.
 *
 * IMPORTANT: This is ISOLATED from the production MongoDB database.
 * The main Zenugo AI application (server.js) does NOT import this file.
 * PostgreSQL is used here solely to demonstrate relational concepts
 * (PK/FK, JOINs) alongside the existing MongoDB/Mongoose setup.
 *
 * Configuration uses environment variables (never hardcoded).
 *
 * Usage:
 *   node server/postgres/postgresClient.js
 * ==============================================================
 */

import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

// Create a connection pool using environment variables
const pool = new Pool({
  host: process.env.PG_HOST || "localhost",
  port: parseInt(process.env.PG_PORT || "5432", 10),
  database: process.env.PG_DATABASE || "zenugo_concepts",
  user: process.env.PG_USER || "postgres",
  password: process.env.PG_PASSWORD || "",
});

/**
 * Execute a SQL query against the PostgreSQL database.
 * Uses async/await — also demonstrates Concept 1 (Async/Await).
 */
export async function query(text, params) {
  try {
    const result = await pool.query(text, params);
    return result;
  } catch (error) {
    console.error("PostgreSQL query error:", error.message);
    throw error;
  }
}

/**
 * Run the INNER JOIN and LEFT JOIN demo queries.
 * This function is called when the file is executed directly.
 */
async function runJoinDemos() {
  console.log("=== Zenugo AI — PostgreSQL JOIN Demo ===\n");

  try {
    // INNER JOIN — only users WITH conversations
    console.log("--- INNER JOIN: Users with conversations ---");
    const innerJoinResult = await query(`
      SELECT
          users.name       AS user_name,
          users.email      AS user_email,
          conversations.title AS conversation_title
      FROM users
      INNER JOIN conversations
          ON users.id = conversations.user_id
      ORDER BY users.name, conversations.title
    `);
    console.table(innerJoinResult.rows);

    // LEFT JOIN — ALL users, including those without conversations
    console.log("\n--- LEFT JOIN: All users (including those without conversations) ---");
    const leftJoinResult = await query(`
      SELECT
          users.name       AS user_name,
          users.email      AS user_email,
          conversations.title AS conversation_title
      FROM users
      LEFT JOIN conversations
          ON users.id = conversations.user_id
      ORDER BY users.name, conversations.title
    `);
    console.table(leftJoinResult.rows);

  } catch (error) {
    console.error("Demo failed:", error.message);
    console.log("\nNote: This demo requires a running PostgreSQL database.");
    console.log("See server/.env.example for configuration.");
  } finally {
    await pool.end();
  }
}

// Run demo if executed directly (not imported as module)
if (process.argv[1] && process.argv[1].includes("postgresClient")) {
  runJoinDemos();
}

export default pool;
