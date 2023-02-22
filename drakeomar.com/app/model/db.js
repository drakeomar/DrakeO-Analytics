const mysql = require("mysql");
const dbConfig = require("./db.config.js");
// First utilize local mysql server, then migrate, test with DBAAS
const connection = mysql.createConnection({
  host: dbConfig.RHOST,
  user: dbConfig.RUSER,
  password: dbConfig.RPASSWORD,
  port: dbConfig.RPORT,
  database: dbConfig.RDB
});

connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});
module.exports = connection;
