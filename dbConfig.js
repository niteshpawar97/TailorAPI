// dbConfig.js
const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'tailor_app',
  password: '',
  waitForConnections: true,
  connectionLimit: 10, // Adjust the connection limit as needed
  queueLimit: 0
});

// Get a connection from the pool
const getConnection = () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(connection);
    });
  });
};

module.exports = { getConnection };
