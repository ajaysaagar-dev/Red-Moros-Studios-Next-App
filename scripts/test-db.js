const { Client } = require("pg");

async function run() {
  const adminClient = new Client({
    host: "localhost",
    port: 5432,
    user: "ajaysaagar",
    password: "aass209c",
    database: "postgres",
  });

  try {
    await adminClient.connect();
    console.log("Connected to postgres server on 5432!");
    const check = await adminClient.query("SELECT 1 FROM pg_database WHERE datname='redmoros'");
    if (check.rows.length === 0) {
      await adminClient.query("CREATE DATABASE redmoros");
      console.log("Database redmoros created successfully!");
    } else {
      console.log("Database redmoros already exists.");
    }
  } catch (err) {
    console.error("Admin client error:", err);
  } finally {
    await adminClient.end();
  }

  // Now connect to redmoros db
  const redmorosClient = new Client({
    host: "localhost",
    port: 5432,
    user: "ajaysaagar",
    password: "aass209c",
    database: "redmoros",
  });

  try {
    await redmorosClient.connect();
    console.log("Successfully connected to redmoros database!");
    const res = await redmorosClient.query("SELECT NOW()");
    console.log("DB Time:", res.rows[0]);
  } catch (err) {
    console.error("redmoros connect error:", err);
  } finally {
    await redmorosClient.end();
  }
}

run();
