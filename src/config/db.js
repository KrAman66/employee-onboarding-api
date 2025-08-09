const { Pool } = require("pg");
require("dotenv").config();
const dns = require("dns");

(async () => {
  // Resolve Supabase hostname to IPv4 address
  try {
    const addresses = await dns.promises.lookup(
      process.env.DB_HOST || "db.kulsgphwerspnycyahxj.supabase.co",
      { family: 4 }
    );
    console.log("Using IPv4:", addresses.address);
    process.env.DB_HOST_IPV4 = addresses.address;
  } catch (err) {
    console.error("DNS lookup failed:", err);
  }
})();

const pool = new Pool({
  user: "postgres",
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST_IPV4 || process.env.DB_HOST,
  port: 5432,
  database: "postgres",
  ssl: { rejectUnauthorized: false },
  keepAlive: true,
});

module.exports = pool;
