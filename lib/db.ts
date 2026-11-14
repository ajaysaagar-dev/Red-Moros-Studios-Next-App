import { Pool } from "pg";

// Parse environment variables with fallback
const getDbConfig = () => {
  const host = process.env.PG_HOST || "localhost";
  const user = process.env.PG_USER || "ajaysaagar";
  const password = process.env.PG_PASSWORD || "aass209c";
  const database = process.env.PG_DB || "redmoros";
  const envPort = process.env.PG_PORT ? parseInt(process.env.PG_PORT, 10) : 5432;
  
  return {
    host,
    port: isNaN(envPort) ? 5432 : envPort,
    user,
    password,
    database,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 4000,
  };
};

let pool: Pool | null = null;

export const getPool = (): Pool => {
  if (!pool) {
    const config = getDbConfig();
    pool = new Pool(config);

    pool.on("error", (err: Error) => {
      console.error("Unexpected error on idle postgres client", err);
    });
  }
  return pool;
};

// Safe query execution helper with automatic fallback to port 5432 if configured port gives ECONNREFUSED
export async function query<T = Record<string, unknown>>(
  text: string, 
  params?: unknown[]
): Promise<{ rows: T[]; rowCount: number | null }> {
  const activePool = getPool();
  try {
    const res = await activePool.query(text, params);
    return { rows: res.rows as T[], rowCount: res.rowCount };
  } catch (err: unknown) {
    const errorObj = err as { code?: string };
    const poolOptions = (activePool as unknown as { options?: { port?: number } }).options;
    if (errorObj?.code === "ECONNREFUSED" && poolOptions?.port !== 5432) {
      console.warn(`Connection refused on port ${poolOptions?.port}. Retrying connection on port 5432...`);
      const fallbackConfig = { ...getDbConfig(), port: 5432 };
      pool = new Pool(fallbackConfig);
      const res = await pool.query(text, params);
      return { rows: res.rows as T[], rowCount: res.rowCount };
    }
    throw err;
  }
}
