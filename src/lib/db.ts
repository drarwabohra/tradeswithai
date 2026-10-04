import "server-only";
import { Pool } from "pg";
const globalDb = globalThis as unknown as { twaPool?: Pool };
export function db() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");
  if (!globalDb.twaPool) {
    globalDb.twaPool = new Pool({
      connectionString: process.env.DATABASE_URL, max: 3,
      connectionTimeoutMillis: 5000, statement_timeout: 5000, idleTimeoutMillis: 10000,
    });
    // Idle connections can fail outside a request; handle the pool event without logging PII.
    globalDb.twaPool.on("error", error => {
      console.error("order_database_pool_error", { name: error.name });
    });
  }
  return globalDb.twaPool;
}
