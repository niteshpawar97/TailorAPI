// models/shopUserModel.js
const { getConnection } = require('../dbConfig.js');

const ShopUserModel = {
    getAllUsers: (callback) => {
      getConnection()
        .then((connection) => {
          connection.query('SELECT * FROM `users`', (err, results) => {
            connection.release(); // Release the connection back to the pool
            if (err) {
              callback(err, null);
              return;
            }
            callback(null, results);
          });
        })
        .catch((err) => {
          callback(err, null);
        });
    },
  
    createUser: (username, subscription_type, password_hash, callback) => {
      getConnection()
        .then((connection) => {
          connection.query('INSERT INTO `users` (username, subscription_type, password_hash) VALUES (?, ?, ?)', [username, subscription_type, password_hash], (err, results) => {
            connection.release(); // Release the connection back to the pool
            if (err) {
              callback(err, null);
              return;
            }
            callback(null, results);
          });
        })
        .catch((err) => {
          callback(err, null);
        });
    },
  
    loginUser: (username, password, callback) => {
      getConnection()
        .then((connection) => {
          connection.query('SELECT * FROM `users` WHERE username = ? AND password_hash = ?', [username, password], (err, results) => {
            connection.release(); // Release the connection back to the pool
            if (err) {
              callback(err, null);
              return;
            }
  
            if (results.length === 0) {
              callback(null, null);
            } else {
              callback(null, results[0]);
            }
          });
        })
        .catch((err) => {
          callback(err, null);
        });
    },
  };
  
  module.exports = ShopUserModel;