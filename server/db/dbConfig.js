require("dotenv").config();
const mysql2 = require("mysql2");
const dbConnection = mysql2.createPool({
	user: process.env.DB_USER,
	database: process.env.MYSQL_DB,
	host: process.env.DB_HOST || "127.0.0.1",
	password: process.env.DB_PASS,
	connectionLimit: 10,
});

module.exports = dbConnection.promise();
