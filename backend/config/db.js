const mysql = require("mysql2/promise");

// MySQL database connection
const db = mysql.createPool({
  host: "api.sidak.lampungsehat.org",
  user: "lampungsehat_sidak30",
  password: "sidak_1234",
  database: "lampungsehat_db_sidak",
  port: 3306,
});

db.getConnection()
  .then((connection) => {
    console.log("Connected to MySQL database");
    connection.release(); // Jangan lupa melepaskan koneksi
  })
  .catch((err) => {
    console.error("Unable to connect to MySQL database:", err.message);
  });

module.exports = db;