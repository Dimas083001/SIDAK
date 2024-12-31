require('dotenv').config(); // Memuat variabel lingkungan dari file .env
const mysql = require("mysql2/promise");

// MySQL database connection
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

db.getConnection().then((connection) => {
  console.log("Connected to MySQL database");
});

module.exports = db;
