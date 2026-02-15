const pkg = require("pg");
const { Pool } = pkg;
const pool = new Pool({
  user: "incubator_user",
  host: "localhost",
  database: "incubator_db",
  password: "strongpassword",
  port: 5432,
});
console.log("Database connection pool created successfully");

module.exports = pool;