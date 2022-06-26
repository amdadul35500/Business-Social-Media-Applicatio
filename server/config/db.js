const mysql = require("mysql2");

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.BD_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.getConnection((err) => {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = connection;
