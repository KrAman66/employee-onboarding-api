const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  host: process.env.DB_HOST, // optional override
  port: 5432,
  keepAlive: true, // helps prevent connection drops
});

module.exports = pool;
