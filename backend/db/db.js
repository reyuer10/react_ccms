let mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DATABASE_PORT,
  connectionLimit: 10,
  enableKeepAlive: true,
  keepAliveInitialDelay: 3 * 1000,
  maxIdle: 0,
  idleTimeout: 5 * 6 * 1000,
  queueLimit: 0,
});

connection.connect((err) => {
  if (err) {
    console.log("Error connecting to the database");
  } else {
    console.log("Connected to the database");
  }
});

// const sql = 'SELECT * FROM tb_canister'

// connection.query(sql, (err, data) => {
//   if (err) {
//     console.error("Error executing query", err.message);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }

//   return console.log("Results: ", data);
// });

module.exports = connection;
