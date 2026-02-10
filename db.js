const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://postgres:aayushsql@localhost:5432/perntodo",
  ssl: process.env.DATABASE_URL
    ? { rejectUnauthorized: false }
    : false
});

module.exports = pool;
