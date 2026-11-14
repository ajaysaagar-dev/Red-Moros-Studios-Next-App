const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.PG_HOST || "localhost",
  port: parseInt(process.env.PG_PORT || "5432"),
  user: process.env.PG_USER || "ajaysaagar",
  password: process.env.PG_PASSWORD || "aass209c",
  database: process.env.PG_DB || "redmoros",
});

async function initTables() {
  const client = await pool.connect();
  try {
    console.log("Connected to redmoros DB. Creating tables...");

    // Create jobs table
    await client.query(`
      CREATE TABLE IF NOT EXISTS jobs (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        department TEXT DEFAULT 'Engineering',
        location TEXT DEFAULT 'Remote',
        type TEXT DEFAULT 'Full-time',
        status TEXT DEFAULT 'Open',
        first_name TEXT,
        last_name TEXT,
        years_of_experience INT DEFAULT 0,
        discord_username TEXT,
        portfolio_link TEXT,
        linkedin_profile TEXT,
        cv_filename TEXT,
        cv_data TEXT,
        cv_mimetype TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
    console.log("Table 'jobs' verified/created.");

    // Create job_applications table
    await client.query(`
      CREATE TABLE IF NOT EXISTS job_applications (
        id SERIAL PRIMARY KEY,
        job_id INT REFERENCES jobs(id) ON DELETE SET NULL,
        job_title TEXT NOT NULL,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        years_of_experience INT NOT NULL DEFAULT 0,
        discord_username TEXT NOT NULL,
        portfolio_link TEXT,
        linkedin_profile TEXT,
        cv_filename TEXT NOT NULL,
        cv_mimetype TEXT NOT NULL,
        cv_data TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
    console.log("Table 'job_applications' verified/created.");

    // Tables ready
    console.log("Database schema initialized and verified.");
  } catch (err) {
    console.error("Error creating tables:", err);
  } finally {
    client.release();
    await pool.end();
  }
}

initTables();
