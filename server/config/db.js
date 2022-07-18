const mysql = require("mysql2");

const connection = mysql.createPool({
  host: "localhost", //process.env.DB_HOST,
  port: "3306", //process.env.BD_PORT,
  user: "root", //process.env.DB_USERNAME,
  password: "shahin12", //process.env.DB_PASSWORD,
  database: "businessinstagram", //process.env.DB_NAME,
});

connection.getConnection((err) => {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = connection;
