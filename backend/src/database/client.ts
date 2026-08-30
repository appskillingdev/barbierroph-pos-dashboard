import { Pool } from "pg";

// Create a connection pool (Singleton)
export const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "admin",
  database: process.env.DB_NAME || "mydb",
  password: process.env.DB_PASSWORD || "admin",
  max: 20, // Max number of concurrent connections in the pool
  idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
});

// Test the pool connection once during server startup
export async function testDbConnection(): Promise<void> {
  try {
    const client = await pool.connect();
    console.log("Database pool initialized successfully.");
    client.release(); // Immediately release the test client back to the pool
  } catch (error) {
    console.error("Critical: Failed to connect to the database pool:", error);
    process.exit(1); // Shutdown server if DB is unreachable
  }
}
