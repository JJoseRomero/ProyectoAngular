const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',          // <-- coloca tu usuario de MySQL
  password: '',          // <-- coloca tu contraseña de MySQL
  database: 'framework', //nombre de la base de datos
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;